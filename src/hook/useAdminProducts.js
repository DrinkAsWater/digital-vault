import { useCallback, useEffect, useState } from "react";
import {
  adminCreateProduct,
  adminGetAllProducts,
  adminUnpublishProduct,
  adminUpdateProduct,
  adminPublishProduct, // ← 新增
} from "../utils/ApiFunction";
import { useUI } from "../context/UIContext";

export const useAdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showToast } = useUI();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminGetAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || "取得商品失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (data, onSuccess) => {
    try {
      await adminCreateProduct(data);
      showToast("✅", "商品已新增");
      fetchProducts();
      onSuccess?.();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "新增失敗");
    }
  };

  const updateProduct = async (id, data, onSuccess) => {
    try {
      await adminUpdateProduct(id, data);
      showToast("✅", "商品已更新");
      fetchProducts();
      onSuccess?.();
    } catch (err) {
      showToast("❌", err.response?.data?.message || "更新失敗");
    }
  };

  const unpublishProduct = async (id) => {
    try {
      await adminUnpublishProduct(id);
      showToast("✅", "商品已下架");
      // 直接更新 state，不重新 fetch
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: false } : p)),
      );
    } catch (err) {
      showToast("❌", err.response?.data?.message || "下架失敗");
      fetchProducts();
    }
  };

  const publishProduct = async (id) => {
    try {
      await adminPublishProduct(id);
      showToast("✅", "商品已上架");
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublished: true } : p)),
      );
    } catch (err) {
      showToast("❌", err.response?.data?.message || "上架失敗");
      fetchProducts();
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    unpublishProduct,
    publishProduct,
    refetch: fetchProducts,
  };
};
