import { BASE_URL } from "..//..//..//shared//utils//constants";

export default function ProductCard({ product }) {
  const imageUrl = product.thumbnail ? `${BASE_URL}${product.thumbnail}` : null;

  return (
    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="h-[180px] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-bold text-green-600">
          {product.price?.toLocaleString("vi-VN")}đ
        </p>
      </div>
    </div>
  );
}
