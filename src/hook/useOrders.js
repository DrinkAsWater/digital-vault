import { useEffect, useState } from "react";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  getDownload,
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
// 取得下載連結
export const useDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloads, setDownloads] = useState(null);

  const fetchDownload = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDownload(orderId);
      setDownloads(data);
    } catch (err) {
      setError(err.response?.data?.message || "取得下載連結失敗");
    } finally {
      setLoading(false);
    }
  };
  return { downloads, loading, error, fetchDownload };
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

// 從訂單列表找出包含指定商品的訂單 ID
export const useOrderIdByProduct = (productId) => {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    getMyOrders()
      .then((orders) => {
        // 找出包含這個商品、且已付款或已完成的訂單
        const matched = orders.find(
          (order) =>
            (order.status === 1 || order.status === 2) &&
            order.items?.some((item) => item.productId === productId),
        );
        setOrderId(matched?.id ?? null);
      })
      .catch(() => setOrderId(null))
      .finally(() => setLoading(false));
  }, [productId]);

  return { orderId, loading };
};
