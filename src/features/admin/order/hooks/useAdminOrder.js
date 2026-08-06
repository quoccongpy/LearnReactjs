import { useCallback, useEffect, useRef, useState } from "react";
import {
  getAllOrdersPaged,
  getOrderById,
  updateOrderStatus,
} from "../services/adminOrderService";

export const useAdminOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const selectedOrderRef = useRef(null);
  useEffect(() => {
    selectedOrderRef.current = selectedOrder;
  }, [selectedOrder]);

  const fetchOrderDetail = useCallback(async (orderId) => {
    setLoadingDetail(true);
    setSelectedOrder(null);
    try {
      const res = await getOrderById(orderId);
      setSelectedOrder(res.data);
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Không thể tải chi tiết đơn hàng!",
      );
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await getAllOrdersPaged({
        keyword,
        status: statusFilter,
        pageIndex: page,
        pageSize: 8,
      });
      const data = res.data;
      setOrders(data.results || []);
      setTotalPages(Math.ceil(data.rowCount / data.pageSize) || 1);
      setTotalCount(data.rowCount || 0);
      if (data.results && data.results.length > 0) {
        const currentSelected = selectedOrderRef.current;
        if (currentSelected) {
          const isStillInList = data.results.find(
            (o) => o.id === currentSelected.id,
          );
          if (!isStillInList) {
            setSelectedOrder(null);
          }
        }
      } else {
        setSelectedOrder(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Không thể tải danh sách đơn hàng!",
      );
    } finally {
      setLoadingList(false);
    }
  }, [keyword, statusFilter, page, fetchOrderDetail]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setKeyword(searchInput);
  };
  const handleUpdateStatus = async (orderId, status) => {
    await updateOrderStatus(orderId, status);
    await fetchOrderDetail(orderId);
    await fetchOrders();
  };
  return {
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
  };
};
