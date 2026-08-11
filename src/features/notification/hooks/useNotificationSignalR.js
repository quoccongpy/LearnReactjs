import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
export const useNotificationSignalR = ({ user, onReceive }) => {
  const connectionRef = useRef(null);
  const isConnectingRef = useRef(false);

  useEffect(() => {
    if (!user) {
      if (connectionRef.current) {
        connectionRef.current.stop();
        connectionRef.current = null;
      }
      isConnectingRef.current = false;
      return;
    }
    if (connectionRef.current || isConnectingRef.current) {
      return;
    }

    isConnectingRef.current = true;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5000/hubs/notification", {
        accessTokenFactory: () => localStorage.getItem("auth_token"),
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    const handleReceiveNotification = (notification) => {
      onReceive(notification);
    };

    connection.on("ReceiveNotification", handleReceiveNotification);

    connection
      .start()
      .then(() => {
        connectionRef.current = connection;
      })
      .catch((err) => {
        console.error("[SignalR] Error:", err);
      })
      .finally(() => {
        isConnectingRef.current = false;
      });

    return () => {
      connection.off("ReceiveNotification", handleReceiveNotification);
      if (connection.state !== signalR.HubConnectionState.Disconnected) {
        connection.stop();
      }
      if (connectionRef.current === connection) {
        connectionRef.current = null;
      }

      isConnectingRef.current = false;
    };
  }, [user, onReceive]);
};
