import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { capturePayPalPayment } from "../services/paymentService";
import toastService from "../../../shared/utils/toastService";

export default function usePayPalCallback() {
  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isCaptured = useRef(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (!token) {
      setPaymentResult({
        success: false,
        message: "Không tìm thấy thông tin giao dịch PayPal.",
      });
      setLoading(false);
      return;
    }
    if (isCaptured.current) return;
    isCaptured.current = true;

    let timerId = null;
    const capture = async () => {
      try {
        const res = await capturePayPalPayment(token);
        setPaymentResult(res.data);
        if (res.data?.success) {
          toastService.success("Thanh toán PayPal thành công!");
          setTimeout(() => {
            navigate(
              `/order-confirmation/${res.data.orderId}?payment_status=success`,
              { replace: true },
            );
          }, 3000);
        }
      } catch (error) {
        isCaptured.current = false;
        setPaymentResult({
          success: false,
          message:
            error.response?.data?.message ||
            "Xác thực thanh toán PayPal thất bại.",
        });
      } finally {
        setLoading(false);
      }
    };
    capture();
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [location.search, navigate]);
  return { loading, paymentResult };
}
