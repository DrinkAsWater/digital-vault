import axios from "axios";
import { getToken } from "./tokenHelper";
const BASE_URL = import.meta.env.VITE_API_URL || "https://localhost:7124/api";
export const getHeader = () => {
  const token = getToken();
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    "Content-Type": "application/json",
  };
};
// 註冊 - 回傳 RegisterResponse { message, email, displayName }
// 取得所有分類列表
export const register = async (email, displayName, password) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, {
    email,
    displayName,
    password,
  });
  return res.data;
};
export const login = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return res.data;
};
// 登入 - 回傳 AuthResponse { token, email, displayName, role }
export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/category`);
  return res.data;
};

// 取得所有商品，可傳入 categoryId 篩選分類（Guid 或 null）
export const getProducts = async (categoryId = null) => {
  const url = categoryId
    ? `${BASE_URL}/product?categoryId=${categoryId}`
    : `${BASE_URL}/product`;
  const res = await axios.get(url);
  return res.data;
};
// 取得單一商品詳情，傳入商品 Guid
export const getProductById = async (id) => {
  const res = await axios.get(`${BASE_URL}/product/${id}`);
  return res.data;
};
// 建立訂單 - 傳入 productIds[]，需要驗證
export const createOrder = async (productIds) => {
  const res = await axios.post(
    `${BASE_URL}/order`,
    { productIds },
    { headers: getHeader() },
  );
  return res.data;
};
// 需要驗證的請求才帶 header，例如取得購物車、訂單
export const getMyOrders = async () => {
  const res = await axios.get(`${BASE_URL}/order`, { headers: getHeader() });
  return res.data;
};
// 取得單一訂單詳情，需要驗證
export const getOrderById = async (id) => {
  const res = await axios.get(`${BASE_URL}/order/${id}`, {
    headers: getHeader(),
  });
  return res.data;
};
// 取消訂單，需要驗證
export const cancelOrder = async (id) => {
  const res = await axios.put(
    `${BASE_URL}/order/${id}/cancel`,
    {},
    { headers: getHeader() },
  );
  return res.data;
};

// 取得商品的所有評論（公開）
export const getReviewsByProduct = async (productId) => {
  const res = await axios.get(`${BASE_URL}/review/product/${productId}`);
  return res.data;
};

// 取得單筆評論（公開）
export const getReviewById = async (id) => {
  const res = await axios.get(`${BASE_URL}/review/${id}`);
  return res.data;
};

// 取得自己的評論（需登入）
export const getMyReviews = async () => {
  const res = await axios.get(`${BASE_URL}/review/my`, {
    headers: getHeader(),
  });
  return res.data;
};

// 新增評論（需登入）
export const createReview = async (productId, orderId, rating, comment) => {
  const res = await axios.post(
    `${BASE_URL}/review`,
    { productId, orderId, rating, comment },
    { headers: getHeader() },
  );
  return res.data;
};

// 修改評論（需登入）
export const updateReview = async (id, rating, comment) => {
  const res = await axios.put(
    `${BASE_URL}/review/${id}`,
    { rating, comment },
    { headers: getHeader() },
  );
  return res.data;
};

// 刪除評論（需登入）
export const deleteReview = async (id) => {
  const res = await axios.delete(`${BASE_URL}/review/${id}`, {
    headers: getHeader(),
  });
  return res.data;
};

// 取得已購商品（需登入）
export const getPurchases = async () => {
  const res = await axios.get(`${BASE_URL}/user/purchases`, {
    headers: getHeader(),
  });
  return res.data;
};
// 修改顯示名稱，需要驗證
export const updateDisplayName = async (displayName) => {
  const res = await axios.put(
    `${BASE_URL}/user/displayName`,
    { displayName },
    { headers: getHeader() },
  );
  return res.data;
};
// 修改密碼，需要驗證
export const updatePassword = async (currentPassword, newPassword) => {
  const res = await axios.put(
    `${BASE_URL}/user/password`,
    { currentPassword, newPassword },
    { headers: getHeader() },
  );
  return res.data;
};
// 建立付款，需要驗證
export const createPayment = async (orderId, provider, cardInfo = {}) => {
  const res = await axios.post(
    `${BASE_URL}/payment`,
    { orderId, provider, ...cardInfo },
    { headers: getHeader() },
  );
  return res.data;
};

// 取得訂單付款紀錄，需要驗證
export const getPaymentByOrder = async (orderId) => {
  const res = await axios.get(`${BASE_URL}/payment/order/${orderId}`, {
    headers: getHeader(),
  });
  return res.data;
};

// 模擬超商繳費確認
export const confirmCVSPayment = async (paymentId) => {
  const res = await axios.put(
    `${BASE_URL}/payment/${paymentId}/cvs-confirm`,
    {},
    { headers: getHeader() },
  );
  return res.data;
};

// 取得訂單下載連結，需要驗證
export const getDownload = async (orderId) => {
  const res = await axios.get(`${BASE_URL}/order/${orderId}/download`, {
    headers: getHeader(),
  });
  return res.data;
};

// 登出 - 將 token 加入黑名單
export const apiLogout = async (token, refreshToken) => {
  const res = await axios.post(
    `${BASE_URL}/auth/logout`,
    { token, refreshToken },
    { headers: getHeader() },
  );
  return res.data;
};

// Refresh Token
export const refreshToken = async (refreshToken, oldLoginToken) => {
  const res = await axios.post(`${BASE_URL}/auth/refresh`, {
    refreshToken,
    oldLoginToken,
  });
  return res.data;
};

// Google 登入入口
export const googleLogin = () => {
  window.location.href = `${BASE_URL}/auth/google`;
};
