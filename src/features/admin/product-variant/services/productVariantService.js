import axiosClient from "../../../../core/api/axiosClient";

const productVariantService = {
  getProductsWithVariant: () =>
    axiosClient.get("/product-variant/product-with-variant"),
  getByProductId: (productId) =>
    axiosClient.get(`/product-variant/by-product/${productId}`),
  create: (data) => axiosClient.post("/product-variant", data),
  update: (id, data) => axiosClient.put(`/product-variant/${id}`, data),
  delete: (id) => axiosClient.delete(`/product-variant/${id}`),
};

export default productVariantService;
