export const OPEN_HOUR = 10;
export const CLOSE_HOUR = 22;
export const PREPARATION_MINUTES = 30;
export const SLOT_INTERVAL = 15;

export const formatTime = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

export const canDeliverNow = () => {
  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const latestDeliverNow = CLOSE_HOUR * 60 - PREPARATION_MINUTES;

  return currentMinutes <= latestDeliverNow;
};

export const generateDeliverySlots = () => {
  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const earliestMinutes = currentMinutes + PREPARATION_MINUTES;

  const roundedStart =
    Math.ceil(earliestMinutes / SLOT_INTERVAL) * SLOT_INTERVAL;

  const openMinutes = OPEN_HOUR * 60;

  const closeMinutes = CLOSE_HOUR * 60;

  const slots = [];

  if (roundedStart <= closeMinutes) {
    const startMinutes = Math.max(roundedStart, openMinutes);

    for (let m = startMinutes; m <= closeMinutes; m += SLOT_INTERVAL) {
      slots.push({
        date: "today",
        time: formatTime(m),
      });
    }

    return slots;
  }

  const tomorrowStart = openMinutes + PREPARATION_MINUTES;

  for (let m = tomorrowStart; m <= closeMinutes; m += SLOT_INTERVAL) {
    slots.push({
      date: "tomorrow",
      time: formatTime(m),
    });
  }

  return slots;
};

export const getDefaultMode = () => {
  return canDeliverNow() ? "now" : "schedule";
};

export const getDisplayTime = (selectedTime) => {
  if (!selectedTime) {
    return "Chọn thời gian";
  }

  if (selectedTime.type === "now") {
    return "Giao ngay";
  }

  return `Hẹn giờ giao - ${selectedTime.time}`;
};
