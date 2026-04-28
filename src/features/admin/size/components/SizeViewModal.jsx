import { IoCloseOutline } from "react-icons/io5";
export default function SizeViewModal({ open, onClose, selected }) {
  if (!open) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-md shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            Chi tiết danh mục
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <IoCloseOutline className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-xs text-gray-400 uppercase mb-1">ID</p>
            <p className="text-sm font-medium text-gray-800">{selected?.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase mb-1">Tên Size</p>
            <p className="text-sm font-medium text-gray-800">
              {selected?.name}
            </p>
          </div>
        </div>
        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
