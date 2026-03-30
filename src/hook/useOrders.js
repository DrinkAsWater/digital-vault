import { useEffect, useState } from "react";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from "../utils/ApiFuction";

// 取得我的訂單列表
export const useMyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = () => {
    let cancelled = false;
    setLoading(true);
    getMyOrders()
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
  };

  useEffect(() => {
    return fetchOrders();
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
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

// 取消訂單
export const useCancelOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancel = async (id, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cancelOrder(id);
      onSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "取消訂單失敗");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, cancel };
};
