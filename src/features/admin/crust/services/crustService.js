import axiosClient from "../../../../core/api/axiosClient";

const crustService = {
  getAll: () => axiosClient.get("/crust"),
  getById: (id) => axiosClient.get(`/crust/${id}`),
  create: (data) => axiosClient.post("/crust", data),
  update: (id, data) => axiosClient.put(`/crust/${id}`, data),
  delete: (id) => axiosClient.delete(`/crust/${id}`),
};
export default crustService;
