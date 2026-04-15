import { useState, useEffect, useCallback } from "react";
import { adminGetAllPayments, adminVoidPayment } from "../utils/ApiFunction";
import { useUI } from "../context/UIContext";

export const useAdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useUI();

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllPayments(page, 20);
      setPayments(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "載入付款記錄失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments, page]);

  const voidPayment = useCallback(async (id, reason) => {
    try {
      await adminVoidPayment(id, reason);
      showToast("✅", "付款已作廢");
      fetchPayments();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "作廢失敗");
    }
  }, [showToast, fetchPayments]);

  return { payments, loading, error, voidPayment, page,
    setPage,
    totalPages, // ← 新增
    refetch: fetchPayments, };
};