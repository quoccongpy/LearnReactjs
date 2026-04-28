import { IoTrashOutline } from "react-icons/io5";
export default function SizeDeleteModal({
  open,
  onClose,
  onConfirm,
  selected,
}) {
  if (!open) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-sm shadow-xl text-center p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-red-50 rounded-full mx-auto mb-4 flex items-center justify-center">
          <IoTrashOutline className="w-6 h-6 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Xác nhận xóa
        </h3>
        <p className="text-gray-500 text-sm mb-1">Bạn có chắc muốn xóa size?</p>
        <p className="font-semibold text-gray-800 mb-6">"{selected?.name}"?</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-100 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
