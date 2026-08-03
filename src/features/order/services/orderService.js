import axiosClient from "../../../../src/core/api/axiosClient";
export const createOrder = (orderData) => {
  return axiosClient.post("/orders", orderData);
};

export const getOrdersByUser = (params) => {
  return axiosClient.get("/orders/get-order-by-user", { params });
};
export const getOrderById = (orderId) => {
  return axiosClient.get(`/orders/${orderId}`);
};
export const cancelOrder = (orderId) => {
  return axiosClient.delete(`/orders?id=${orderId}`);
};

export const createPaymentIntent = (orderId) => {
  return axiosClient.post(`/payment/stripe/create-payment-intent/${orderId}`);
};
export const executeVnPayPayment = async (query) => {
  const params = new URLSearchParams(query);

  return axiosClient.get(`/payment/vnpay/return?${params.toString()}`);
};
