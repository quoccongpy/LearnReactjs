import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripeCheckout } from "../hooks/useStripeCheckout";

export default function CheckoutForm({ orderId }) {
  const { stripe, loading, error, confirmPayment } = useStripeCheckout(orderId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await confirmPayment();
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <PaymentElement />

      {error && <div className="stripe-error">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="stripe-pay-btn"
      >
        {loading ? "Đang xử lý..." : "Xác nhận thanh toán"}
      </button>
    </form>
  );
}
