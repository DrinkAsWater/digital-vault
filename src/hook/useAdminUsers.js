import { useState, useEffect, useCallback } from "react";
import {
  adminGetAllUsers,
  adminDeactivateUser,
  adminActivateUser,
  adminUpdateUserRole,
} from "../utils/ApiFuction";
import { useUI } from "../context/UIContext";

export const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useUI();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || "載入用戶失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  return { users, loading, error, deactivate, activate, updateRole };
};