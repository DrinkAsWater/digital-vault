import { useState, useEffect, useCallback } from "react";
import { adminGetAllOrders, adminUpdateOrderStatus } from "../utils/ApiFunction";
import { useUI } from "../context/UIContext";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useUI();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllOrders(page, 10); // ← 傳入 page
      setOrders(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "載入訂單失敗");
    } finally {
      setLoading(false);
    }
  }, [page]); // ← 依賴 page

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // ← 正確寫法

  const updateStatus = useCallback(
    async (id, status) => {
      try {
        await adminUpdateOrderStatus(id, status);
        showToast("✅", "訂單狀態已更新");
        fetchOrders();
      } catch (err) {
        showToast("❌", err.response?.data?.message || "更新失敗");
      }
    },
    [showToast, fetchOrders],
  );

  return {
    orders,
    loading,
    error,
    updateStatus,
    page,
    setPage,
    totalPages, // ← 新增
    refetch: fetchOrders,
  };
};
