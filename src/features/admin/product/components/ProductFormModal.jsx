import { IoCloseOutline } from "react-icons/io5";
export default function ProductFormModal({
  open,
  onClose,
  onSubmit,
  mode,
  formData,
  setFormData,
  categories,
  thumbnailRef,
  imagesRef,
  thumbnailPreview,
  imagesPreview,
  handleThumbnailChange,
  handleImagesChange,
  handleRemoveThumbnail,
  handleRemoveImage,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">
            {mode === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              placeholder="Nhập tên..."
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
            ></input>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <select
              value={formData.categoryId}
              required
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả
            </label>
            <textarea
              placeholder="Nhập mô tả..."
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837] resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ảnh thumbnail
            </label>
            <input
              type="file"
              ref={thumbnailRef}
              accept="image/*"
              onChange={handleThumbnailChange}
              className="block w-full text-sm text-gray-500 
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-lg file:border-0
                                 file:text-sm file:font-semibold
                               file:bg-blue-50 file:text-blue-700
                               hover:file:bg-blue-100"
            ></input>
            {thumbnailPreview && (
              <div className="relative w-fit mt-2 group">
                <img
                  src={thumbnailPreview}
                  className="w-28 h-28 object-cover rounded-xl border shadow"
                />

                {/* nút x */}
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ảnh sản phẩm (nhiều ảnh)
            </label>
            <input
              type="file"
              accept="image/*"
              ref={imagesRef}
              multiple
              onChange={handleImagesChange}
              className="block w-full text-sm text-gray-500 
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-lg file:border-0
                                 file:text-sm file:font-semibold
                               file:bg-green-50 file:text-green-700
                               hover:file:bg-green-100"
            />
            {imagesPreview.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {imagesPreview.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      key={index}
                      src={img}
                      className="w-full h-40 object-contain rounded-lg border bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Hủy
          </button>
          <button
            onClick={() => onSubmit(formData)}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#E31837] hover:bg-red-700 rounded-lg"
          >
            {mode === "add" ? "Thêm" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
