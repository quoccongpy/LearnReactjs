import { IoSearchOutline } from "react-icons/io5";
import {
  getStatusBadgeClass,
  getStatusText,
} from "../../../../shared/utils/orderStatusUtils";

export default function OrderList({
  orders,
  searchInput,
  setSearchInput,
  page,
  setPage,
  totalPages,
  loadingList,
  selectedOrder,
  handleSearchSubmit,
  fetchOrderDetail,
}) {
  return (
    <div className="lg:col-span-1 flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Tìm mã đơn, SĐT nhận hàng..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all shadow-xs"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E31837] transition-colors cursor-pointer"
        >
          <IoSearchOutline className="w-5 h-5" />
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1 min-h-[400px] flex flex-col">
        {loadingList ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E31837]"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <p className="font-medium text-lg">Chưa có đơn hàng nào</p>
            <p className="text-sm mt-1">
              Lịch sử đặt hàng của bạn sẽ xuất hiện ở đây.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 flex-1">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => fetchOrderDetail(order.id)}
                className={`p-5 cursor-pointer transition-all flex flex-col gap-2 hover:bg-gray-50/50 ${
                  selectedOrder?.id === order.id
                    ? "bg-red-50/30 border-l-4 border-[#E31837]"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">
                    Đơn hàng #{order.id}
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadgeClass(
                      order.status,
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                  </span>
                  <span className="font-semibold text-gray-900 text-sm">
                    {Number(order.totalMoney).toLocaleString("vi-VN")} đ
                  </span>
                </div>
                <span className="text-xs text-gray-400 truncate max-w-[280px]">
                  Giao tới: {order.address}
                </span>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-sm">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Trước
            </button>
            <span className="text-gray-600 font-medium">
              Trang {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
