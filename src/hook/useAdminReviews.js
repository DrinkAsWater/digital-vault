import { useState, useEffect, useCallback } from "react";
import { adminGetAllReviews, adminDeleteReview } from "../utils/ApiFunction";
import { useUI } from "../context/UIContext";

export const useAdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useUI();

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetAllReviews();
      setReviews(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "載入評論失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const deleteReview = useCallback(
    async (id) => {
      if (!window.confirm("確定要刪除這則評論嗎？")) return;
      try {
        await adminDeleteReview(id);
        showToast("✅", "評論已刪除");
        fetchReviews();
      } catch (err) {
        showToast("❌", err.response?.data?.message || "刪除失敗");
      }
    },
    [showToast, fetchReviews],
  );

  return { reviews, loading, error, deleteReview };
};
