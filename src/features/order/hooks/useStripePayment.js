import { useEffect, useRef, useState } from "react";
import { createPaymentIntent } from "../services/orderService";
import toastService from "../../../shared/utils/toastService";

export const useStripePayment = (orderId) => {
  const [stripeData, setStripeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isCaptured = useRef(false);
  useEffect(() => {
    if (!orderId || isCaptured.current) return;
    isCaptured.current = true;

    const initPayment = async () => {
      try {
        const res = await createPaymentIntent(orderId);

        setStripeData({
          clientSecret: res.data.clientSecret,
          publishableKey: res.data.publishableKey,
        });
      } catch (error) {
        toastService.error(error, "Không thể khởi tạo thanh toán");
      } finally {
        setLoading(false);
      }
    };

    initPayment();
  }, [orderId]);

  return {
    stripeData,
    loading,
  };
};
