import { useEffect } from "react";
import { ORDER_STEPS } from "../../../../shared/utils/orderStatusUtils";
import {
  IoSearchOutline,
  IoTimeOutline,
  IoSettingsOutline,
  IoBicycleOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoLocationOutline,
  IoCallOutline,
  IoPersonOutline,
  IoMailOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import toastService from "../../../../shared/utils/toastService";
import { useOrderTracking } from "../../hooks/useOrderTracking";
import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";

export default function OrderTrackingPage() {
  const {
    error,
    orders,
    searchInput,
    setSearchInput,
    page,
    setPage,
    totalPages,
    loadingList,
    loadingDetail,
    selectedOrder,
    handleSearchSubmit,
    fetchOrderDetail,
  } = useOrderTracking();

  useEffect(() => {
    if (error) {
      toastService.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <OrderList
            orders={orders}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            loadingList={loadingList}
            selectedOrder={selectedOrder}
            handleSearchSubmit={handleSearchSubmit}
            fetchOrderDetail={fetchOrderDetail}
          ></OrderList>
          <OrderDetail
            selectedOrder={selectedOrder}
            loadingDetail={loadingDetail}
          ></OrderDetail>
        </div>
      </div>
    </div>
  );
}
