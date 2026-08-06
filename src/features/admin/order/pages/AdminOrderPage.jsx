import { useAdminOrder } from "../hooks/useAdminOrder";
import { IoRefreshOutline } from "react-icons/io5";
import {
  getStatusText,
  ORDER_STEPS,
} from "../../../../shared/utils/orderStatusUtils";
import { useEffect } from "react";
import toastService from "../../../../shared/utils/toastService";
import Swal from "sweetalert2";
import AdminOrderList from "./AdminOrderList";
import AdminOrderDetail from "./AdminOrderDetail";
import { NEXT_STATUS_MAP } from "../constants/orderAdminConstants";
export default function AdminOrderPage() {
  const {
    error,
    orders,
    searchInput,
    setSearchInput,
    statusFilter,
    setStatusFilter,
    setPage,
    totalPages,
    totalCount,
    loadingList,
    loadingDetail,
    selectedOrder,
    handleSearchSubmit,
    fetchOrderDetail,
    fetchOrders,
    handleUpdateStatus,
  } = useAdminOrder();

  const nextStatuses = selectedOrder
    ? NEXT_STATUS_MAP[selectedOrder.status] || []
    : [];

  useEffect(() => {
    if (error) toastService.error(error);
  }, [error]);

  const onChangeStatus = async (newStatus) => {
    const statusLabel = getStatusText(newStatus);
    const result = await Swal.fire({
      title: `Xác nhận chuyển trạng thái?`,
      text: `Đơn hàng #${selectedOrder.id} sẽ được chuyển sang "${statusLabel}".`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#E31837",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy",
    });
    if (!result.isConfirmed) return;
    try {
      await handleUpdateStatus(selectedOrder.id, newStatus);
      toastService.success(`Đã cập nhật trạng thái thành "${statusLabel}"`);
    } catch (err) {
      toastService.error(err.response?.data?.message || "Cập nhật thất bại!");
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Đơn hàng</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tổng cộng{" "}
            <span className="font-semibold text-gray-700">{totalCount}</span>{" "}
            đơn hàng
          </p>
        </div>
        <button
          onClick={() => fetchOrders()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <IoRefreshOutline className="w-4 h-4" />
          Làm mới
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <AdminOrderList
          handleSearchSubmit={handleSearchSubmit}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          setPage={setPage}
          loadingList={loadingList}
          orders={orders}
          fetchOrderDetail={fetchOrderDetail}
          selectedOrder={selectedOrder}
          totalPages={totalPages}
        ></AdminOrderList>

        <AdminOrderDetail
          loadingDetail={loadingDetail}
          selectedOrder={selectedOrder}
          nextStatuses={nextStatuses}
          onChangeStatus={onChangeStatus}
        ></AdminOrderDetail>
      </div>
    </div>
  );
}
