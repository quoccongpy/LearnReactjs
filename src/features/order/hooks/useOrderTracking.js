import { useCallback, useEffect, useRef, useState } from "react";
import { getOrderById, getOrdersByUser } from "../services/orderService";

export const useOrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  const selectedOrderRef = useRef(selectedOrder);
  useEffect(() => {
    selectedOrderRef.current = selectedOrder;
  }, [selectedOrder]);

  const fetchOrderDetail = useCallback(async (orderId) => {
    try {
      setLoadingDetail(true);
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

  const fetchOrders = useCallback(
    async (resetSelected = false) => {
      try {
        setLoadingList(true);
        const res = await getOrdersByUser({
          keyword: keyword,
          pageIndex: page,
          pageSize: 5,
        });
        const data = res.data;
        setOrders(data.results || []);
        setTotalPages(Math.ceil(data.rowCount / data.pageSize) || 1);

        if (data.results && data.results.length > 0) {
          const currentSelected = selectedOrderRef.current;
          if (resetSelected || !currentSelected) {
            fetchOrderDetail(data.results[0].id);
          } else {
            const isStillInList = data.results.find(
              (o) => o.id === currentSelected.id,
            );
            if (!isStillInList) {
              fetchOrderDetail(data.results[0].id);
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
    },
    [keyword, page, fetchOrderDetail],
  );

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setKeyword(searchInput);
  };

  return {
    error,
    orders,
    searchInput,
    setSearchInput,
    keyword,
    page,
    setPage,
    totalPages,
    loadingList,
    loadingDetail,
    selectedOrder,
    handleSearchSubmit,
    fetchOrderDetail,
  };
};
