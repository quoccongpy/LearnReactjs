import { useMemo, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import {
  generateDeliverySlots,
  getDefaultMode,
} from "../../../shared/utils/deliveryTime";

export default function TimePickerModal({ selectedTime, onSelect, onClose }) {
  const slots = useMemo(() => generateDeliverySlots(), []);

  const groupedSlots = useMemo(
    () => ({
      today: slots.filter((x) => x.date === "today"),
      tomorrow: slots.filter((x) => x.date === "tomorrow"),
    }),
    [slots],
  );

  const [mode, setMode] = useState(selectedTime?.type ?? getDefaultMode());

  const [picked, setPicked] = useState(
    selectedTime?.type === "schedule"
      ? {
          date: selectedTime.date,
          time: selectedTime.time,
        }
      : (slots[0] ?? null),
  );

  const handleApply = () => {
    if (mode === "now") {
      onSelect({
        type: "now",
      });

      return;
    }

    if (!picked) return;

    onSelect({
      type: "schedule",
      date: picked.date,
      time: picked.time,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="time-modal" onClick={(e) => e.stopPropagation()}>
        <div className="time-modal__header">
          <h2 className="time-modal__title">THỜI GIAN NHẬN</h2>

          <button type="button" className="time-modal__close" onClick={onClose}>
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="form-group">
          <label>Thời gian</label>

          <select
            className="form-input"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="now">Giao ngay</option>

            <option value="schedule">Hẹn giờ giao</option>
          </select>
        </div>

        {mode === "schedule" && (
          <div className="time-modal__grid-container">
            {groupedSlots.today.length > 0 && (
              <>
                <div className="slot-title">Hôm nay</div>

                <div className="time-modal__grid">
                  {groupedSlots.today.map((slot) => (
                    <button
                      key={`${slot.date}-${slot.time}`}
                      type="button"
                      className={`time-slot ${
                        picked?.date === slot.date && picked?.time === slot.time
                          ? "time-slot--active"
                          : ""
                      }`}
                      onClick={() => setPicked(slot)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </>
            )}

            {groupedSlots.tomorrow.length > 0 && (
              <>
                <div className="slot-title">Ngày mai</div>

                <div className="time-modal__grid">
                  {groupedSlots.tomorrow.map((slot) => (
                    <button
                      key={`${slot.date}-${slot.time}`}
                      type="button"
                      className={`time-slot ${
                        picked?.date === slot.date && picked?.time === slot.time
                          ? "time-slot--active"
                          : ""
                      }`}
                      onClick={() => setPicked(slot)}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <button
          type="button"
          className="time-modal__apply"
          disabled={mode === "schedule" && !picked}
          onClick={handleApply}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
}
