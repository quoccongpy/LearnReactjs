import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toastService from "../../../shared/utils/toastService";
import { executeVnPayPayment } from "../services/orderService";

export default function useVnPayCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState(null);
  const isCaptured = useRef(false);

  useEffect(() => {
    if (isCaptured.current) return;
    isCaptured.current = true;
    let timeoutId;
    const verifyPayment = async () => {
      try {
        const response = await executeVnPayPayment(location.search);
        setPaymentResult(response.data);
        if (response.data.success) {
          toastService.success("Thanh toán thành công!");
          timeoutId = setTimeout(() => {
            navigate(
              `/order-confirmation/${response.data.orderId}?payment_status=success`,
              {
                replace: true,
              },
            );
          }, 3000);
        } else {
          toastService.error(response.data.message);
        }
      } catch (error) {
        setPaymentResult({
          success: false,
          message: "Có lỗi xảy ra khi xác thực giao dịch.",
        });

        toastService.error(error, "Có lỗi xảy ra khi xác thực giao dịch.");
      } finally {
        setLoading(false);
      }
    };
    verifyPayment();
    return () => clearTimeout(timeoutId);
  }, [location.search, navigate]);
  return {
    loading,
    paymentResult,
  };
}
