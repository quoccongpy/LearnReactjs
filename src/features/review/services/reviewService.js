import axiosClient from "../../../core/api/axiosClient";

const reviewService = {
  getByProduct: (productId, params = {}) =>
    axiosClient.get(`/product-reviews/${productId}`, { params }),
  canReview: (productId) =>
    axiosClient.get(`/product-reviews/can-review`, { params: { productId } }),
  create: (data) => axiosClient.post(`/product-reviews`, data),
  update: (reviewId, data) =>
    axiosClient.put(`/product-reviews/${reviewId}`, data),
  remove: (reviewId) => axiosClient.delete(`/product-reviews/${reviewId}`),
  hide: (reviewId, isHidden) =>
    axiosClient.patch(`/product-reviews/${reviewId}/hide`, null, {
      params: { isHidden },
    }),
  getAllForAdmin: (params = {}) =>
    axiosClient.get(`/product-reviews/admin/all`, { params }),
};
export default reviewService;
