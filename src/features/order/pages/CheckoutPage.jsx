import "../../../shared/styles/checkout.css";
import DeliverySection from "./DeliverySection.jsx";
import { IoChevronForward } from "react-icons/io5";
import TimePickerModal from "./TimePickerModal.jsx";
import CustomerSection from "./CustomerSection.jsx";
import PaymentMethodSection from "./PaymentMethodSection.jsx";
import OrderSummarySection from "./OrderSummarySection.jsx";

import useCheckout from "../hooks/useCheckout.js";
export default function CheckoutPage() {
  const {
    form,
    handleChange,
    handleSubmit,
    loading,
    showTimeModal,
    setShowTimeModal,
    count,
    total,
  } = useCheckout();

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
            <CustomerSection
              fullName={form.fullName}
              phoneNumber={form.phoneNumber}
              email={form.email}
              onChange={handleChange}
            ></CustomerSection>
            <PaymentMethodSection
              selectedMethod={form.paymentMethod}
              onChange={handleChange}
            ></PaymentMethodSection>
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
