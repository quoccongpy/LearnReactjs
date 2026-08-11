import { IoCloseOutline } from "react-icons/io5";
export default function NotificationItem({ notification, onRead, onDelete }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };
  const getTypeStyle = (type, isRead) => {
    const opacity = isRead ? "opacity-60" : "";
    switch (type) {
      case "success":
        return `border-l-4 border-emerald-400 bg-emerald-50 ${opacity}`;
      case "error":
        return `border-l-4 border-rose-400 bg-rose-50 ${opacity}`;
      case "warning":
        return `border-l-4 border-amber-400 bg-amber-50 ${opacity}`;
      default:
        return `border-l-4 border-blue-400 bg-blue-50 ${opacity}`;
    }
  };
  const { id, type, isRead, title, message, createdAt } = notification;
  const handleClick = () => {
    if (!isRead) {
      onRead(id);
    }
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    onDelete(id);
  };

  return (
    <div
      key={id}
      onClick={() => !id.isRead && handleClick(id)}
      className={`flex gap-3 p-4 border-b border-gray-50 last:border-b-0 transition-all
                        ${getTypeStyle(type, isRead)}
                        ${!isRead ? "cursor-pointer hover:brightness-95" : ""}
                      `}
    >
      <span className="text-lg shrink-0">{getTypeIcon(type)}</span>
      <div className="flex-1 min-w-0">
        <p
          className={`font-semibold text-sm truncate ${isRead ? "text-gray-500" : "text-gray-900"}`}
        >
          {title}
        </p>
        {!isRead && (
          <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
        )}
        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
          {message}
        </p>
        <p className="text-[10px] text-gray-400 mt-1">
          {new Date(createdAt).toLocaleString("vi-VN")}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(id);
        }}
        className="text-gray-300 hover:text-gray-500 shrink-0 transition-colors"
      >
        <IoCloseOutline className="w-4 h-4" />
      </button>
    </div>
  );
}
