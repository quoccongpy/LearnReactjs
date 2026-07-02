import axiosClient from "../../../core/api/axiosClient";

//region : vn pay
export const createVnPayUrl = async (orderId) => {
  return axiosClient.post(`/payment/vnpay/create-vnpay-url/${orderId}`);
};

export const paymentVnpayExecute = async (query) => {
  const params = new URLSearchParams(query);
  return axiosClient.get(`/payment/vnpay/return?${params.toString()}`);
};
