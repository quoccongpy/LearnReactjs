import { IoTrashOutline, IoPencilOutline, IoEyeOutline } from "react-icons/io5";
export default function CrustTable({ data, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-500 bg-gray-50 border-b border-gray-100">
            <th className="px-6 py-4 font-semibold w-20">STT</th>
            <th className="px-6 py-4 font-semibold">Tên đế bánh</th>
            <th className="px-6 py-4 font-semibold text-center w-48"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
              <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                {item.name}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      onView(item);
                    }}
                    title="Xem"
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <IoEyeOutline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onEdit(item);
                    }}
                    title="Sửa"
                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"
                  >
                    <IoPencilOutline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onDelete(item);
                    }}
                    title="Xóa"
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
