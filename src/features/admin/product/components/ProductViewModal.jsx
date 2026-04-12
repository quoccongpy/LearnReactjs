import {
  IoCloseOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { BASE_URL } from "..//..//..//..//shared//utils/constants";

export default function ProductViewModal({
  open,
  onClose,
  selected,
  activeImageIndex,
  setActiveImageIndex,
}) {
  if (!open || !selected) return null;

  const allImages = [
    ...(selected.thumbnail
      ? [{ id: "thumb", imageUrl: `${BASE_URL}${selected.thumbnail}` }]
      : []),
    ...(selected.productImagesList?.map((img) => ({
      ...img,
      imageUrl: `${BASE_URL}${img.imageUrl}`,
    })) || []),
  ];

  const stripImages = allImages.filter((img) => img.id !== "thumb");
  const currentImage = allImages[activeImageIndex];

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Chi tiết sản phẩm</h3>
          <button onClick={onClose}>
            <IoCloseOutline className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* IMAGE */}
          {allImages.length > 0 && (
            <div>
              <div className="relative bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={currentImage?.imageUrl}
                  className="w-full h-72 object-contain"
                />

                {activeImageIndex > 0 && (
                  <button
                    onClick={() => setActiveImageIndex(activeImageIndex - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  >
                    <IoChevronBackOutline />
                  </button>
                )}

                {activeImageIndex < allImages.length - 1 && (
                  <button
                    onClick={() => setActiveImageIndex(activeImageIndex + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <IoChevronForwardOutline />
                  </button>
                )}

                <span className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {activeImageIndex + 1}/{allImages.length}
                </span>
              </div>

              <div className="flex gap-2 mt-3 overflow-x-auto">
                {stripImages.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(allImages.indexOf(img))}
                    className="w-16 h-16 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={img.imageUrl}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-400">Tên</p>
            <p className="font-medium">{selected.name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Giá</p>
            <p>{Number(selected.price).toLocaleString("vi-VN")}đ</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Danh mục</p>
            <p>{selected.categoryName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Mô tả</p>
            <p>{selected.description}</p>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
