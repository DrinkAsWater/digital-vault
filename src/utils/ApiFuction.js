import api from "./axiosInstance";
// ── Auth ──
export const register = async (email, displayName, password) => {
  const res = await api.post("/auth/register", {
    email,
    displayName,
    password,
  });
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const apiLogout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const refreshToken = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const googleLogin = () => {
  window.location.href = `${BASE_URL}/auth/google`;
};

// ── Category ──
export const getCategories = async () => {
  const res = await api.get("/category");
  return res.data;
};

// ── Product ──
export const getProducts = async (categoryId = null) => {
  const url = categoryId ? `/product?categoryId=${categoryId}` : "/product";
  const res = await api.get(url);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/product/${id}`);
  return res.data;
};

// ── Order ──
export const createOrder = async (productIds) => {
  const res = await api.post("/order", { productIds });
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/order");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`/order/${id}`);
  return res.data;
};

export const cancelOrder = async (id) => {
  const res = await api.put(`/order/${id}/cancel`, {});
  return res.data;
};

export const getDownload = async (orderId) => {
  const res = await api.get(`/order/${orderId}/download`);
  return res.data;
};

// ── Payment ──
export const createPayment = async (orderId, provider, cardInfo = {}) => {
  const res = await api.post("/payment", { orderId, provider, ...cardInfo });
  return res.data;
};

export const getPaymentByOrder = async (orderId) => {
  const res = await api.get(`/payment/order/${orderId}`);
  return res.data;
};

export const confirmCVSPayment = async (paymentId) => {
  const res = await api.put(`/payment/${paymentId}/cvs-confirm`, {});
  return res.data;
};

// ── Review ──
export const getReviewsByProduct = async (productId) => {
  const res = await api.get(`/review/product/${productId}`);
  return res.data;
};

export const getReviewById = async (id) => {
  const res = await api.get(`/review/${id}`);
  return res.data;
};

export const getMyReviews = async () => {
  const res = await api.get("/review/my");
  return res.data;
};

export const createReview = async (productId, orderId, rating, comment) => {
  const res = await api.post("/review", {
    productId,
    orderId,
    rating,
    comment,
  });
  return res.data;
};

export const updateReview = async (id, rating, comment) => {
  const res = await api.put(`/review/${id}`, { rating, comment });
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await api.delete(`/review/${id}`);
  return res.data;
};

// ── User ──
export const getPurchases = async () => {
  const res = await api.get("/user/purchases");
  return res.data;
};

export const updateDisplayName = async (displayName) => {
  const res = await api.put("/user/displayName", { displayName });
  return res.data;
};

export const updatePassword = async (currentPassword, newPassword) => {
  const res = await api.put("/user/password", { currentPassword, newPassword });
  return res.data;
};

// ── Admin Product ──
export const adminGetAllProducts = async () => {
  const res = await api.get("/admin/product");
  return res.data;
};

export const adminGetProductById = async (id) => {
  const res = await api.get(`/admin/product/${id}`);
  return res.data;
};

export const adminCreateProduct = async (data) => {
  const res = await api.post("/admin/product", data);
  return res.data;
};

export const adminUpdateProduct = async (id, data) => {
  const res = await api.put(`/admin/product/${id}`, data);
  return res.data;
};

export const adminUnpublishProduct = async (id) => {
  const res = await api.delete(`/admin/product/${id}`);
  return res.data;
};

// ── Admin Category ──
export const adminGetAllCategories = async () => {
  const res = await api.get("/admin/category");
  return res.data;
};

export const adminGetCategoryById = async (id) => {
  const res = await api.get(`/admin/category/${id}`);
  return res.data;
};

export const adminCreateCategory = async (data) => {
  const res = await api.post("/admin/category", data);
  return res.data;
};

export const adminUpdateCategory = async (id, data) => {
  const res = await api.put(`/admin/category/${id}`, data);
  return res.data;
};

export const adminDeleteCategory = async (id) => {
  const res = await api.delete(`/admin/category/${id}`);
  return res.data;
};

// ── Admin Order ──
export const adminGetAllOrders = async () => {
  const res = await api.get("/admin/order");
  return res.data;
};

export const adminGetOrderById = async (id) => {
  const res = await api.get(`/admin/order/${id}`);
  return res.data;
};

export const adminUpdateOrderStatus = async (id, status) => {
  const res = await api.put(`/admin/order/${id}/status`, { status });
  return res.data;
};

// ── Admin User ──
export const adminGetAllUsers = async () => {
  const res = await api.get("/admin/user");
  return res.data;
};

export const adminGetUserById = async (id) => {
  const res = await api.get(`/admin/user/${id}`);
  return res.data;
};

export const adminDeactivateUser = async (id) => {
  const res = await api.put(`/admin/user/${id}/deactivate`);
  return res.data;
};

export const adminActivateUser = async (id) => {
  const res = await api.put(`/admin/user/${id}/activate`);
  return res.data;
};

export const adminUpdateUserRole = async (id, role) => {
  const res = await api.put(`/admin/user/${id}/role`, { roleCode:role });
  return res.data;
};

// ── Admin Payment ──
export const adminGetAllPayments = async () => {
  const res = await api.get("/admin/payment");
  return res.data;
};

export const adminVoidPayment = async (id, reason) => {
  const res = await api.put(`/admin/payment/${id}/void`, { reason });
  return res.data;
};