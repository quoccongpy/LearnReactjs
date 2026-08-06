import axiosClient from "../../../../core/api/axiosClient";

export const getAllOrdersPaged = (params) => {
  return axiosClient.get("/orders/get-all", { params });
};
export const getOrderById = (orderId) => {
  return axiosClient.get(`/orders/${orderId}`);
};
export const updateOrderStatus = (orderId, status) => {
  return axiosClient.put(`/orders/${orderId}/status`, { status });
};
