import { IoCloseOutline } from "react-icons/io5";
export default function CrustFormModal({
  open,
  onClose,
  onSubmit,
  mode,
  name,
  setName,
}) {
  if (!open) return null;

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
            {mode === "add" ? "Thêm đế bánh" : "Sửa đế bánh"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <IoCloseOutline className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tên đế bánh
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên đế bánh..."
            autoFocus
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
          ></input>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#E31837] hover:bg-red-700 rounded-lg"
          >
            {mode === "add" ? "Thêm" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
