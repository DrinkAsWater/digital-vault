import { useState, useEffect, useCallback } from "react";
import {
  adminGetAllUsers,
  adminDeactivateUser,
  adminActivateUser,
  adminUpdateUserRole,
} from "../utils/ApiFunction";
import { useUI } from "../context/UIContext";

export const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { showToast } = useUI();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllUsers(page, 20);
      setUsers(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "載入用戶失敗");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, page]);

  const deactivate = useCallback(async (id) => {
    try {
      await adminDeactivateUser(id);
      showToast("✅", "帳號已停用");
      fetchUsers();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "停用失敗");
    }
  }, [showToast, fetchUsers]);

  const activate = useCallback(async (id) => {
    try {
      await adminActivateUser(id);
      showToast("✅", "帳號已啟用");
      fetchUsers();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "啟用失敗");
    }
  }, [showToast, fetchUsers]);

  const updateRole = useCallback(async (id, role) => {
    try {
      await adminUpdateUserRole(id, role);
      showToast("✅", "角色已更新");
      fetchUsers();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "更新失敗");
    }
  }, [showToast, fetchUsers]);

  return { users, loading, error, deactivate, activate, updateRole, page, setPage, totalPages  };
};