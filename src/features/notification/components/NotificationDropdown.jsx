import { useState, useRef, useEffect } from "react";
import { useNotification } from "../hooks/useNotification";
import {
  IoNotificationsOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const {
    notifications,
    loadNotifications,
    unreadCount,
    handleMarkAllAsRead,
    handleMarkAsRead,
    handleDelete,
  } = useNotification();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleOpen = async () => {
    const isOpening = !open;
    setOpen((prev) => !prev);
    if (isOpening) {
      await loadNotifications();
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <IoNotificationsOutline className="w-5 h-5 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#E31837] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-sm">
              Thông báo
              {notifications.length > 0 && (
                <span className="ml-2 text-xs text-gray-400 font-normal">
                  ({notifications.length})
                </span>
              )}
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <IoCheckmarkDoneOutline className="w-3.5 h-3.5" />
                Đọc tất cả
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <IoNotificationsOutline className="w-10 h-10 mb-2 text-gray-300" />
                <p className="text-sm">Chưa có thông báo nào</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={handleMarkAsRead}
                  onDelete={handleDelete}
                ></NotificationItem>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
