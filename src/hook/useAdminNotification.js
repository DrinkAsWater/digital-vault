import { useState, useEffect, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { useUI } from "../context/UIContext";

const HUB_URL = "/hubs/admin-notification";

export const useAdminNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);
  const connectionRef = useRef(null);
  const { showToast } = useUI();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    // 監聽新訂單
    connection.on("NewOrder", (data) => {
      setNotifications((prev) => [data, ...prev]);
      showToast("🔔", data.message);
    });

    // 連線狀態
    connection.onreconnecting(() => setConnected(false));
    connection.onreconnected(() => setConnected(true));
    connection.onclose(() => setConnected(false));

    // 啟動連線
    connection
      .start()
      .then(() => setConnected(true))
      .catch((err) => {
        console.error("SignalR 連線失敗:", err);
        setConnected(false);
      });

    return () => {
      connection.stop();
    };
  }, [showToast]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return { notifications, connected, clearNotifications };
};
