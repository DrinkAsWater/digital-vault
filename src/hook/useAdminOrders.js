import { useState, useEffect, useCallback } from "react";
import {
  adminGetAllOrders,
  adminUpdateOrderStatus,
} from "../utils/ApiFuction";
import { useUI } from "../context/UIContext";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useUI();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err.response?.data?.message || "載入訂單失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = useCallback(async (id, status) => {
    try {
      await adminUpdateOrderStatus(id, status);
      showToast("✅", "訂單狀態已更新");
      fetchOrders();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "更新失敗");
    }
  }, [showToast, fetchOrders]);

  return { orders, loading, error, updateStatus, refetch: fetchOrders };
};