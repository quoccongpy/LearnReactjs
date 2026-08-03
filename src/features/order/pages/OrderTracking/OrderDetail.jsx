import {
  IoBicycleOutline,
  IoCloseCircleOutline,
  IoChatbubbleOutline,
  IoPersonOutline,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
} from "react-icons/io5";
import {
  getStatusBadgeClass,
  getStatusText,
} from "../../../../shared//utils/orderStatusUtils";
import OrderSteps from "./OrderSteps";

export default function OrderDetail({ selectedOrder, loadingDetail }) {
  if (loadingDetail) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-24 min-h-[500px]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#E31837]"></div>
        </div>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center p-24 text-center text-gray-400 min-h-[500px]">
          <IoBicycleOutline className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-700">Chi tiết đơn hàng</h3>
          <p className="text-sm mt-1 max-w-xs">
            Vui lòng chọn một đơn hàng ở cột bên trái để theo dõi tiến trình.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="p-6 md:p-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Chi tiết Đơn hàng #{selectedOrder.id}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Ngày đặt:{" "}
                {new Date(selectedOrder.orderDate).toLocaleString("vi-VN")}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full border ${getStatusBadgeClass(
                selectedOrder.status,
              )}`}
            >
              {getStatusText(selectedOrder.status)}
            </span>
          </div>

          {selectedOrder.status === "Cancelled" ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4">
              <IoCloseCircleOutline className="w-12 h-12 text-red-500 shrink-0" />
              <div>
                <h4 className="font-bold text-red-900">Đơn hàng đã bị hủy</h4>
                <p className="text-xs text-red-700 mt-0.5">
                  Chúng tôi rất tiếc vì sự cố này. Bạn có thể đặt đơn mới hoặc
                  liên hệ CSKH.
                </p>
              </div>
            </div>
          ) : (
            <OrderSteps status={selectedOrder.status} />
          )}

          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-gray-50/50 p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider">
                Danh sách món ăn
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {selectedOrder.orderDetails?.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex justify-between items-center gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {item.productName}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.sizeName && (
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded font-medium">
                          Size: {item.sizeName}
                        </span>
                      )}
                      {item.crustName && (
                        <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded font-medium">
                          Đế: {item.crustName}
                        </span>
                      )}
                      {item.note && (
                        <span className="text-gray-400 text-xs italic flex items-center gap-1">
                          <IoChatbubbleOutline className="w-3.5 h-3.5" />{" "}
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-gray-500">
                      x{item.quantity}
                    </span>
                    <p className="font-semibold text-gray-900 text-sm">
                      {Number(item.price * item.quantity).toLocaleString(
                        "vi-VN",
                      )}{" "}
                      đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50/30 p-4 border-t border-gray-100 flex justify-between items-center">
              <span className="font-bold text-gray-700 text-sm">
                Tổng tiền thanh toán:
              </span>
              <span className="text-xl font-extrabold text-[#E31837]">
                {Number(selectedOrder.totalMoney).toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/30 rounded-2xl p-6 border border-gray-100">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">
                Thông tin người nhận
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li className="flex items-center gap-2.5">
                  <IoPersonOutline className="text-gray-400 w-4.5 h-4.5" />
                  <span className="font-medium text-gray-900">
                    {selectedOrder.fullName}
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <IoCallOutline className="text-gray-400 w-4.5 h-4.5" />
                  <span>{selectedOrder.phoneNumber}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <IoMailOutline className="text-gray-400 w-4.5 h-4.5" />
                  <span className="truncate">{selectedOrder.email}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider border-b border-gray-100 pb-2">
                Địa chỉ & Ghi chú
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li className="flex items-start gap-2.5">
                  <IoLocationOutline className="text-gray-400 w-4.5 h-4.5 mt-0.5 shrink-0" />
                  <span>{selectedOrder.address}</span>
                </li>
                {selectedOrder.note && (
                  <li className="flex items-start gap-2.5">
                    <IoChatbubbleOutline className="text-gray-400 w-4.5 h-4.5 mt-0.5 shrink-0" />
                    <span className="italic">
                      Ghi chú: {selectedOrder.note}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
