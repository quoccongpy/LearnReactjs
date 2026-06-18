import { useState } from "react";
import "../../../shared/styles/checkout.css";
import { PAYMENT_METHODS } from "../../../shared/utils/constants";
export default function PaymentMethodSection({ onChange }) {
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const handleSelect = (id) => {
    setSelectedMethod(id);
    if (onChange) onChange(id);
  };
  return (
    <div className="checkout-card">
      <h2>Phương thức thanh toán</h2>
      <div className="payment-list">
        {PAYMENT_METHODS.map((method) => {
          const isChecked = selectedMethod === method.id;
          return (
            <label
              key={method.id}
              className={`payment-item ${isChecked ? "payment-item--active" : ""}`}
              onClick={() => handleSelect(method.id)}
            >
              <div className="payment-radio-wrapper">
                <input
                  type="radio"
                  name="payment_method"
                  checked={isChecked}
                  onChange={() => handleSelect(method.id)}
                  className="payment-radio-input"
                />
                <span className="payment-radio-custom"></span>
              </div>

              <div className="payment-icon-wrapper">
                <img
                  src={method.image}
                  alt={method.name}
                  className="payment-icon"
                />
              </div>

              <span className="payment-name">{method.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
