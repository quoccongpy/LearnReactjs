import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from "../../../core/store/slice/cartSlice";
import { useEffect, useState } from "react";
import { createOrder } from "../services/orderService";
import toastService from "../../../shared/utils/toastService";

export default function useCheckout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const cartItems = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const [loading, setLoading] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const [form, setForm] = useState({
    address: "",
    note: "",
    deliveryTime: { type: "now" },
    fullName: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "stripe",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.fullName || !form.phoneNumber || !form.email) {
      toastService.error("Vui lòng điền đầy đủ thông tin khách hàng");
      return false;
    }
    return true;
  };

  const buildScheduledTime = () => {
    const { deliveryTime } = form;
    if (deliveryTime.type === "now") {
      return new Date().toISOString();
    }
    const now = new Date();
    const targetDate = new Date(now);
    if (deliveryTime.date === "tomorrow") {
      targetDate.setDate(targetDate.getDate() + 1);
    }
    const [hours, minutes] = deliveryTime.time.split(":");
    targetDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return targetDate.toISOString();
  };

  const buildOrderData = () => ({
    fullName: form.fullName,
    email: form.email,
    phoneNumber: form.phoneNumber,
    address: form.address,
    note: form.note,
    shippingAddress: form.address,
    paymentMethod: form.paymentMethod,
    scheduledTime: buildScheduledTime(),
    orderDetails: cartItems.map((item) => ({
      productId: item.productId,
      productVariantId: item.variantId || null,
      quantity: item.quantity,
      price: item.price,
      productName: item.productName,
      sizeName: item.sizeName || null,
      crustName: item.crustName || null,
      note: item.note || null,
    })),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const orderRes = await createOrder(buildOrderData());
      const { orderId } = orderRes.data;
      dispatch(clearCart());
      switch (form.paymentMethod) {
        case "stripe":
          navigate(`/payment/stripe/${orderId}`);
          break;
        case "vnpay":
          navigate(`/payment/vnpay/${orderId}`);
          break;
        default:
          navigate(`/payment/stripe/${orderId}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toastService.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Đặt hàng thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    showTimeModal,
    setShowTimeModal,
    count,
    total,
  };
}
