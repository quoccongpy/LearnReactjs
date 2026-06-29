import axiosClient from "../../../../src/core/api/axiosClient";
export const createOrder = (orderData) => {
  return axiosClient.post("/orders", orderData);
};
export const createPaymentIntent = (orderId) => {
  return axiosClient.post(`/payment/create-payment-intent/${orderId}`);
};
