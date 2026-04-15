import { useState, useEffect, useCallback } from "react";
import {
  adminGetAllCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
} from "../utils/ApiFunction";
import { useUI } from "../context/UIContext";

export const useAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useUI();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllCategories();
      setCategories(data);
    } catch (err) {
      setError(err.response?.data?.message || "載入分類失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = useCallback(
    async (data, onSuccess) => {
      try {
        await adminCreateCategory(data);
        showToast("✅", "分類已新增");
        onSuccess?.();
        fetchCategories();
      } catch (err) {
        showToast("❌", err.response?.data?.message || "新增失敗");
      }
    },
    [showToast, fetchCategories],
  );

  const updateCategory = useCallback(
    async (id, data, onSuccess) => {
      try {
        await adminUpdateCategory(id, data);
        showToast("✅", "分類已更新");
        onSuccess?.();
        fetchCategories();
      } catch (err) {
        showToast("❌", err.response?.data?.message || "更新失敗");
      }
    },
    [showToast, fetchCategories],
  );

  const deleteCategory = useCallback(
    async (id) => {
      try {
        await adminDeleteCategory(id);
        showToast("✅", "分類已刪除");
        fetchCategories();
      } catch (err) {
        showToast("❌", err.response?.data?.message || "刪除失敗");
      }
    },
    [showToast, fetchCategories],
  );

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
