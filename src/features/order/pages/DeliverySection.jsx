import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import LocationModal from "../../../shared/components/LocationModal";
import { getDisplayTime } from "../../../shared/utils/deliveryTime";
import TimePickerModal from "./TimePickerModal.jsx";

export default function DeliverySection({
  address,
  note,
  onChange,
  deliveryTime,
}) {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("location");
    if (stored) {
      const data = JSON.parse(stored);
      if (data.address && !address) {
        onChange("address", data.address);
      }
    }
  }, []);
  const displayTime = getDisplayTime(deliveryTime);
  return (
    <>
      <div className="checkout-card">
        <div
          className="delivery-header"
          onClick={() => setShowLocationModal(true)}
          style={{ cursor: "pointer" }}
        >
          <h2>Giao đến</h2>
          <IoChevronForward className="change-address-btn" />
        </div>
        <div className="delivery-address">
          {address || "Chưa chọn địa chỉ giao hàng"}
        </div>

        <div className="form-group">
          <div className="form-label-row">
            <label>Ghi chú</label>
            <span className="char-count">{(note || "").length}/200</span>
          </div>
          <input
            type="text"
            className="form-input"
            placeholder="Ghi chú cho giao hàng, ví dụ: tầng, phòng..."
            value={note || ""}
            onChange={(e) => onChange("note", e.target.value)}
            maxLength={200}
          />
        </div>
        <div className="form-group">
          <label>Thời gian nhận</label>
          <div
            className="time-selector"
            onClick={() => setShowTimeModal(true)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span>{displayTime}</span>
            <IoChevronForward className="time-selector__icon" />
          </div>
        </div>
      </div>
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelect={(data) => {
            onChange("address", data.address);
          }}
        />
      )}
      {showTimeModal && (
        <TimePickerModal
          selectedTime={deliveryTime}
          onSelect={(timeData) => {
            onChange("deliveryTime", timeData);
            setShowTimeModal(false);
          }}
          onClose={() => setShowTimeModal(false)}
        />
      )}
    </>
  );
}
