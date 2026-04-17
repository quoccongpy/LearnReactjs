import axiosClient from "../../../core/api/axiosClient";

const homeService = {
  getAllCategories: () => axiosClient.get("/category"),
  getProductByCategory: (categoryId, take = 50) => {
    return axiosClient.get(`/product/by-category/${categoryId}`, {
      params: { take },
    });
  },
};

export default homeService;
