import axiosClient from "../../../../src/core/api/axiosClient";
export const createOrder = (orderData) => {
  return axiosClient.post("/orders", orderData);
};
export const createPaymentIntent = (orderId) => {
  return axiosClient.post(`/payment/stripe/create-payment-intent/${orderId}`);
};
export const executeVnPayPayment = async (query) => {
  const params = new URLSearchParams(query);

  return axiosClient.get(`/payment/vnpay/return?${params.toString()}`);
};
