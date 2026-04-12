import { BASE_URL } from "..//..//../..//shared/utils/constants";
import { IoEyeOutline, IoPencilOutline, IoTrashOutline } from "react-icons/io5";
export default function ProductTable({
  data,
  pageIndex,
  pageSize,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
            <th className="px-4 py-3 font-semibold w-16">STT</th>
            <th className="px-4 py-3 font-semibold w-20">Ảnh</th>
            <th className="px-4 py-3 font-semibold">Tên sản phẩm</th>
            <th className="px-4 py-3 font-semibold">Giá</th>
            <th className="px-4 py-3 font-semibold">Danh mục</th>
            <th className="px-4 py-3 font-semibold text-center w-40"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-gray-50 hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-sm text-gray-500">
                {(pageIndex - 1) * pageSize + index + 1}
              </td>
              <td className="px-4 py-3">
                <img
                  src={`${BASE_URL}${item.thumbnail}`}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                {item.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {Number(item.price).toLocaleString("vi-VN")}đ
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {item.categoryName}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(item)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <IoEyeOutline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"
                  >
                    <IoPencilOutline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
