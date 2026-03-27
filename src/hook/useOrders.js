import { useEffect, useState } from "react";
import { createOrder, getOrders } from "../utils/ApiFuction";

export const useMyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    getOrders()
      .then((data) => {
        if (!cancelled) {
          setOrders(data);
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

  return { orders, loading, error };
};

// 建立訂單
export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitOrder = async (productIds, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createOrder(productIds);
      onSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || "建立訂單失敗");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, submitOrder };
};
