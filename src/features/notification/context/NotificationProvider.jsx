import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { NotificationContext } from "./NotificationContext";
import notificationService from "../services/notificationService";
import { useNotificationSignalR } from "../hooks/useNotificationSignalR";

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadNotifications = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const [listRes, countRes] = await Promise.all([
        notificationService.getNotifications({
          pageIndex: 1,
          pageSize: 20,
        }),
        notificationService.getUnreadCount(),
      ]);
      setNotifications(listRes.data.items);
      setUnreadCount(countRes.data.count);
    } catch (err) {
      console.error("Load notifications error:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    loadNotifications();
  }, [user, loadNotifications]);

  const handleReceiveNotification = useCallback((notification) => {
    setNotifications((prev) => [
      {
        ...notification,
        id: notification.id,
        isRead: false,
      },
      ...prev,
    ]);

    setUnreadCount((prev) => prev + 1);
  }, []);
  useNotificationSignalR({ user, onReceive: handleReceiveNotification });

  const handleMarkAsRead = useCallback(
    async (id) => {
      const notification = notifications.find((n) => n.id === id);

      if (!notification || notification.isRead) {
        return;
      }

      try {
        await notificationService.markAsRead(id);

        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === id
              ? {
                  ...notification,
                  isRead: true,
                }
              : notification,
          ),
        );

        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error("[Notification] Mark as read error:", error);
      }
    },
    [notifications],
  );

  const handleMarkAllAsRead = useCallback(async () => {
    if (unreadCount === 0) {
      return;
    }

    try {
      await notificationService.markAllAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      console.error("[Notification] Mark all as read error:", error);
    }
  }, [unreadCount]);

  const handleDelete = useCallback(
    async (id) => {
      const notification = notifications.find((n) => n.id === id);

      if (!notification) {
        return;
      }

      try {
        await notificationService.deleteNotification(id);
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== id),
        );
        if (!notification.isRead) {
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      } catch (error) {
        console.error("[Notification] Delete error:", error);
      }
    },
    [notifications],
  );

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        loadNotifications,
        handleMarkAsRead,
        handleMarkAllAsRead,
        handleDelete,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
