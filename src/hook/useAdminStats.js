import { useState, useEffect, useCallback } from "react";
import { adminGetStats } from "../utils/ApiFunction";

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminGetStats();
      setStats(data);
    } catch (err) {
      setError(err.response?.data?.message || "載入統計數據失敗");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error };
};
