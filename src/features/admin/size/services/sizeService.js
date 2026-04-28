import axiosClient from "../../../../core/api/axiosClient";

const sizeService = {
  getAll: () => axiosClient.get("/size"),
  getById: (id) => axiosClient.get(`/size/${id}`),
  create: (data) => axiosClient.post("/size", data),
  update: (id, data) => axiosClient.put(`/size/${id}`, data),
  delete: (id) => axiosClient.delete(`/size/${id}`),
};
export default sizeService;
