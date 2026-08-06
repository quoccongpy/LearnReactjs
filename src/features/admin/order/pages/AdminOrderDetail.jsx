import {
  getStatusBadgeClass,
  getStatusText,
} from "..//../..//..//shared//utils//orderStatusUtils";
import {
  IoSearchOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoChatbubbleOutline,
  IoCloseCircleOutline,
  IoBicycleOutline,
  IoChevronDownOutline,
  IoRefreshOutline,
} from "react-icons/io5";
export default function AdminOrderDetail({
  loadingDetail,
  selectedOrder,
  nextStatuses,
  onChangeStatus,
}) {
  if (loadingDetail) {
    return (
      <div className="xl:col-span-2">
        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center"
          style={{ minHeight: 560 }}
        >
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E31837]" />
        </div>
      </div>
    );
  }
  if (!selectedOrder) {
    return (
      <div className="xl:col-span-2">
        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400 text-center p-20"
          style={{ minHeight: 560 }}
        >
          <IoBicycleOutline className="w-16 h-16 text-gray-200 mb-4" />
          <p className="font-medium text-gray-500">
            Chọn một đơn hàng để xem chi tiết
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="xl:col-span-2">
      <div
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        style={{ minHeight: 560 }}
      >
        {loadingDetail ? (
          <div
            className="flex items-center justify-center"
            style={{ minHeight: 560 }}
          >
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E31837]" />
          </div>
        ) : !selectedOrder ? (
          <div
            className="flex flex-col items-center justify-center text-gray-400 text-center p-20"
            style={{ minHeight: 560 }}
          >
            <IoBicycleOutline className="w-16 h-16 text-gray-200 mb-4" />
            <p className="font-medium text-gray-500">
              Chọn một đơn hàng để xem chi tiết
            </p>
          </div>
        ) : (
          <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Đơn hàng #{selectedOrder.id}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(selectedOrder.orderDate).toLocaleString("vi-VN")}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusBadgeClass(selectedOrder.status)}`}
              >
                {getStatusText(selectedOrder.status)}
              </span>
            </div>

            {nextStatuses.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500 font-medium self-center mr-2">
                  Chuyển sang:
                </span>
                {nextStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => onChangeStatus(status)}
                    className={`px-4 py-2 text-xs font-bold rounded-lg border-2 transition-all cursor-pointer
                              ${
                                status === "Cancelled" || status === "Rejected"
                                  ? "border-rose-300 text-rose-600 hover:bg-rose-50"
                                  : "border-emerald-400 text-emerald-700 hover:bg-emerald-50"
                              }`}
                  >
                    {getStatusText(status)}
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Người nhận
                </p>
                <ul className="flex flex-col gap-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <IoPersonOutline className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800">
                      {selectedOrder.fullName}
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoCallOutline className="w-4 h-4 text-gray-400 shrink-0" />
                    <span>{selectedOrder.phoneNumber}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IoMailOutline className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{selectedOrder.email}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <IoLocationOutline className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span>{selectedOrder.address}</span>
                  </li>
                  {selectedOrder.note && (
                    <li className="flex items-start gap-2">
                      <IoChatbubbleOutline className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                      <span className="italic text-gray-500">
                        {selectedOrder.note}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Tóm tắt đơn
                </p>
                <ul className="flex flex-col gap-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Số món:</span>
                    <span className="font-medium">
                      {selectedOrder.orderDetails?.length || 0} món
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Khách hàng:</span>
                    <span className="font-medium">
                      {selectedOrder.fullName}
                    </span>
                  </li>
                  <li className="flex justify-between pt-2 border-t border-gray-200 mt-1">
                    <span className="font-bold text-gray-700">Tổng tiền:</span>
                    <span className="font-extrabold text-[#E31837]">
                      {Number(selectedOrder.totalMoney).toLocaleString("vi-VN")}{" "}
                      đ
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl overflow-hidden">
              {" "}
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Danh sách món
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {selectedOrder.orderDetails?.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 flex justify-between items-center gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">
                        {item.productName}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {item.sizeName && (
                          <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded">
                            Size: {item.sizeName}
                          </span>
                        )}
                        {item.crustName && (
                          <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded">
                            Đế: {item.crustName}
                          </span>
                        )}
                        {item.note && (
                          <span className="text-gray-400 text-[10px] italic">
                            📝 {item.note}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                      <p className="font-semibold text-sm text-gray-800">
                        {Number(item.price * item.quantity).toLocaleString(
                          "vi-VN",
                        )}{" "}
                        đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
