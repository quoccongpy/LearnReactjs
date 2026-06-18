import { useState } from "react";
import "../../../shared/styles/checkout.css";
import DeliverySection from "./DeliverySection.jsx";
import { IoChevronForward } from "react-icons/io5";
import TimePickerModal from "./TimePickerModal.jsx";
import CustomerSection from "./CustomerSection.jsx";
import PaymentMethodSection from "./PaymentMethodSection.jsx";
import OrderSummarySection from "./OrderSummarySection.jsx";
import { useSelector } from "react-redux";
import {
  selectCartCount,
  selectCartTotal,
} from "../../../core/store/slice/cartSlice.js";
export default function CheckoutPage() {
  const handleSubmit = async (e) => {};
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const [showTimeModal, setShowTimeModal] = useState(false);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  const [form, setForm] = useState({
    address: "",
    note: "",
    deliveryTime: { type: "now" },
    fullName: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "cash",
  });
  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit}>
        <div className="checkout-grid">
          <div className="checkout-left">
            <DeliverySection
              address={form.address}
              onChange={handleChange}
              note={form.note}
              deliveryTime={form.deliveryTime}
            />
            <CustomerSection></CustomerSection>
            <PaymentMethodSection></PaymentMethodSection>
          </div>
          <div className="checkout-right">
            <OrderSummarySection
              count={count}
              total={total}
            ></OrderSummarySection>
          </div>
        </div>
      </form>
      {showTimeModal && (
        <TimePickerModal
          selectedTime={form.deliveryTime}
          onSelect={(timeData) => {
            handleChange("deliveryTime", timeData);
            setShowTimeModal(false);
          }}
          onClose={() => setShowTimeModal(false)}
        ></TimePickerModal>
      )}
    </div>
  );
}
