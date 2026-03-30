import axiosClient from "../../../../core/api/axiosClient";

const productService = {
  create: (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("categoryId", data.categoryId);

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }
    if (data.images) {
      data.images.forEach((file) => formData.append("images", file));
    }
    return axiosClient.post("/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getAll: (keyword = "", pageIndex = 1, pageSize = 10) => {
    return axiosClient.get("/product/get-all", {
      params: { keyword, pageIndex, pageSize },
    });
  },

  getById: (id) => axiosClient.get(`/product/${id}`),

  update: (id, data) => {
    const formData = new FormData();
    if (data.name) formData.append("name", data.name);
    if (data.price) formData.append("price", data.price);
    if (data.description) formData.append("description", data.description);
    if (data.categoryId) formData.append("categoryId", data.categoryId);
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }
    if (data.images) {
      data.images.forEach((file) => formData.append("Images", file));
    }
    if (data.listRetainIdsImage.length > 0) {
      data.listRetainIdsImage.forEach((imgId, index) =>
        formData.append(`ListRetainIdsImage[${index}]`, imgId),
      );
    } else {
      formData.append("ListRetainIdsImage[0]", 0);
    }
    return axiosClient.put(`/product/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  delete: (id) => axiosClient.delete(`/product/${id}`),
};

export default productService;
