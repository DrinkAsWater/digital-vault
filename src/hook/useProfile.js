import { useEffect, useState } from "react";
import { getPurchases, updateDisplayName, updatePassword } from "../utils/ApiFuction";

// 取得已購商品清單
export const usePurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getPurchases()
      .then((data) => {
        if (!cancelled) {
          setPurchases(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.response?.data?.message || err.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { purchases, loading, error };
};

// 修改顯示名稱
export const useUpdateDisplayName = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (displayName, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateDisplayName(displayName);
      onSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "修改失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, submit };
};

// 修改密碼
export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (currentPassword, newPassword, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updatePassword(currentPassword, newPassword);
      onSuccess(data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "密碼修改失敗，請確認目前密碼是否正確",
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, submit };
};
