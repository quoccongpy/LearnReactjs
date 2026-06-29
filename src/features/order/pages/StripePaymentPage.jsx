import { useParams } from "react-router-dom";
import StripePaymentForm from "./StripePaymentForm";
import { useStripePayment } from "../hooks/useStripePayment";

export default function StripePaymentPage() {
  const { orderId } = useParams();
  const { stripeData, loading } = useStripePayment(orderId);
  if (loading) {
    return (
      <div className="checkout-container">
        <p>Đang tải...</p>
      </div>
    );
  }
  if (!stripeData) {
    return (
      <div className="checkout-container">
        <p>Có lỗi xảy ra</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <StripePaymentForm
        clientSecret={stripeData.clientSecret}
        publishableKey={stripeData.publishableKey}
        orderId={orderId}
      ></StripePaymentForm>
    </div>
  );
}
