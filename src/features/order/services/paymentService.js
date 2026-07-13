import axiosClient from "../../../core/api/axiosClient";

//region : vn pay
export const createVnPayUrl = async (orderId) => {
  return axiosClient.post(`/payment/vnpay/create-vnpay-url/${orderId}`);
};

export const paymentVnpayExecute = async (query) => {
  const params = new URLSearchParams(query);
  return axiosClient.get(`/payment/vnpay/return?${params.toString()}`);
};

export const createPayPalOrder = async (orderId) => {
  return axiosClient.post(`/payment/paypal/create-order/${orderId}`);
};

export const capturePayPalPayment = async (paypalOrderId) => {
  return axiosClient.post(`/payment/paypal/capture/${paypalOrderId}`);
};
