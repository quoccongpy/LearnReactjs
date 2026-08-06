export const NEXT_STATUS_MAP = {
  Pending: ["Confirmed", "Rejected"],
  Confirmed: ["Preparing", "Cancelled"],
  Preparing: ["ReadyForPickup"],
  ReadyForPickup: ["Delivering"],
  Delivering: ["Delivered"],
  Delivered: [],
  Cancelled: [],
  Rejected: [],
};

export const STATUS_FILTER_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "Pending", label: "Chờ xác nhận" },
  { value: "Confirmed", label: "Đã xác nhận" },
  { value: "Preparing", label: "Đang chuẩn bị" },
  { value: "ReadyForPickup", label: "Chờ giao" },
  { value: "Delivering", label: "Đang giao" },
  { value: "Delivered", label: "Hoàn thành" },
  { value: "Cancelled", label: "Đã hủy" },
  { value: "Rejected", label: "Từ chối" },
];
