import { IoCloseOutline } from "react-icons/io5";
export default function ProductVariantFormModal({
  open,
  onClose,
  onSubmit,
  mode,
  formData,
  setFormData,
  sizes,
  crusts,
  categories,
  productsByCategory,
  onCategoryChange,
  productName,
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
            {mode === "add" ? "Thêm biến thể" : "Sửa biến thể"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <IoCloseOutline className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5">
          {mode === "add" && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
                value={formData.categoryId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    categoryId: e.target.value,
                    productId: "",
                  });
                  onCategoryChange(e.target.value);
                }}
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                Sản phẩm
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
                value={formData.productId}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    productId: e.target.value,
                  });
                }}
                disabled={!formData.categoryId}
              >
                <option value="">
                  {formData.categoryId
                    ? "-- Chọn sản phẩm --"
                    : "-- Chọn danh mục trước --"}
                </option>
                {productsByCategory.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kích thước
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
            value={formData.sizeId}
            onChange={(e) => {
              setFormData({
                ...formData,
                sizeId: e.target.value,
              });
            }}
          >
            <option value="">-- Chọn kích thước --</option>
            {sizes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đế bánh
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
            value={formData.crustId}
            onChange={(e) => {
              setFormData({
                ...formData,
                crustId: e.target.value,
              });
            }}
          >
            <option value="">-- Chọn đế bánh --</option>
            {crusts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Giá tiền
          </label>
          <input
            type="number"
            placeholder="0"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
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
