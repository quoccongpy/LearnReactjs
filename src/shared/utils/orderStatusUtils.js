import {
  IoTimeOutline,
  IoSettingsOutline,
  IoBicycleOutline,
  IoCloseOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

import { GiCookingPot } from "react-icons/gi";
import { BsBagCheckFill } from "react-icons/bs";
import { MdDoneAll } from "react-icons/md";

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Confirmed":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "Preparing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "ReadyForPickup":
      return "bg-violet-100 text-violet-800 border-violet-200";
    case "Delivering":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Delivered":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Cancelled":
      return "bg-rose-100 text-rose-800 border-rose-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case "Pending":
      return "Chờ xác nhận";
    case "Confirmed":
      return "Đã xác nhận";
    case "Preparing":
      return "Đang chuẩn bị";
    case "ReadyForPickup":
      return "Chờ giao";
    case "Delivering":
      return "Đang giao";
    case "Delivered":
      return "Đã giao";
    case "Cancelled":
      return "Đã hủy";
    case "Rejected":
      return "Từ chối";
    default:
      return status;
  }
};
export const ORDER_STEPS = [
  { key: "Pending", label: "Chờ xác nhận", icon: IoTimeOutline },
  { key: "Confirmed", label: "Đã xác nhận", icon: IoCheckmarkCircleOutline },
  { key: "Preparing", label: "Đang chuẩn bị", icon: GiCookingPot },
  { key: "ReadyForPickup", label: "Chờ giao", icon: BsBagCheckFill },
  { key: "Delivering", label: "Đang giao", icon: IoBicycleOutline },
  { key: "Delivered", label: "Hoàn thành", icon: MdDoneAll },
];

export const getStepState = (stepKey, currentStatus) => {
  const statusOrder = [
    "Pending",
    "Confirmed",
    "Preparing",
    "ReadyForPickup",
    "Delivering",
    "Delivered",
  ];
  const stepIdx = statusOrder.indexOf(stepKey);
  const currentIdx = statusOrder.indexOf(currentStatus);

  if (currentStatus === "Cancelled") return "disabled";
  if (stepIdx < currentIdx) return "completed";
  if (stepIdx === currentIdx) return "active";
  return "pending";
};
