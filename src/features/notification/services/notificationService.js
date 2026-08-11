import axiosClient from "../../../core/api/axiosClient";

const notificationService = {
  getNotifications: (params) => axiosClient.get("/notifications", { params }),
  getUnreadCount: () => axiosClient.get("/notifications/unread-count"),
  markAsRead: (id) => axiosClient.put(`/notifications/${id}/read`),
  markAllAsRead: () => axiosClient.put("/notifications/read-all"),
  deleteNotification: (id) => axiosClient.delete(`/notifications/${id}`),
};
export default notificationService;
