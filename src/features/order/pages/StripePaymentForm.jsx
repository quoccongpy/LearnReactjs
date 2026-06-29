import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../pages/CheckoutForm.jsx";

export default function StripePaymentForm({
  clientSecret,
  publishableKey,
  orderId,
}) {
  const stripePromise = loadStripe(publishableKey);

  return (
    <div className="stripe-wrapper">
      <h2>Thanh toán đơn hàng</h2>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#e63946",
              borderRadius: "8px",
            },
          },
        }}
      >
        <CheckoutForm orderId={orderId} />
      </Elements>
    </div>
  );
}
