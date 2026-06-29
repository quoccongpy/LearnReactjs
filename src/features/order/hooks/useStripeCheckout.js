import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { confirmStripePayment } from "../services/stripeService";

export const useStripeCheckout = (orderId) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const confirmPayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error } = await confirmStripePayment(
      stripe,
      elements,
      `${window.location.origin}/order-confirmation/${orderId}`,
    );

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return {
    stripe,
    loading,
    error,
    confirmPayment,
  };
};
