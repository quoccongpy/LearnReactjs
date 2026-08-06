import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import { STATUS_FILTER_OPTIONS } from "../constants/orderAdminConstants";
import {
  getStatusBadgeClass,
  getStatusText,
} from "..//../..//..//shared//utils//orderStatusUtils";
export default function AdminOrderList({
  handleSearchSubmit,
  searchInput,
  setSearchInput,
  statusFilter,
  setStatusFilter,
  setPage,
  loadingList,
  orders,
  fetchOrderDetail,
  selectedOrder,
  totalPages,
  page,
}) {
  return (
    <div className="xl:col-span-1 flex flex-col gap-3">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          placeholder="Tìm mã đơn, SĐT, tên khách..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E31837]/30 focus:border-[#E31837] transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E31837] transition-colors"
        >
          <IoSearchOutline className="w-4 h-4" />
        </button>
      </form>
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#E31837]/30 appearance-none cursor-pointer"
        >
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
        style={{ minHeight: 480 }}
      >
        {loadingList ? (
          <div className="flex-1 flex items-center justify-center p-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E31837]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-gray-400">
            <p className="font-medium">Không có đơn hàng nào</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 flex-1 overflow-y-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => fetchOrderDetail(order.id)}
                className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedOrder?.id === order.id
                    ? "bg-red-50/40 border-l-4 border-[#E31837]"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-gray-900 text-sm">
                    #{order.id} — {order.fullName}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getStatusBadgeClass(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{order.phoneNumber}</span>
                  <span className="font-semibold text-gray-700">
                    {Number(order.totalMoney).toLocaleString("vi-VN")} đ
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 truncate">
                  {new Date(order.orderDate).toLocaleString("vi-VN")}
                </p>
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="p-3 border-t border-gray-100 flex justify-between items-center text-xs shrink-0">
            <button
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Trước
            </button>
            <span className="text-gray-500 font-medium">
              Trang {page} / {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
