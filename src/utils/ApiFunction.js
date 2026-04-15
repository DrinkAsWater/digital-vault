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
  window.location.href = `${api.defaults.baseURL}/auth/google`;
};

// ── Category ──
export const getCategories = async () => {
  const res = await api.get("/category");
  return res.data;
};

// 商品搜尋（更新現有的 getProducts）
export const getProducts = async (params = {}) => {
  const query = new URLSearchParams();
  if (params.categoryId) query.append("categoryId", params.categoryId);
  if (params.keyword) query.append("keyword", params.keyword);
  if (params.minPrice) query.append("minPrice", params.minPrice);
  if (params.maxPrice) query.append("maxPrice", params.maxPrice);
  if (params.sortBy) query.append("sortBy", params.sortBy);
  if (params.sortOrder) query.append("sortOrder", params.sortOrder);
  if (params.page) query.append("page", params.page);
  if (params.pageSize) query.append("pageSize", params.pageSize);
  const res = await api.get(`/product?${query.toString()}`);
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

// 訂單（加入分頁）
export const getMyOrders = async (page = 1, pageSize = 10) => {
  const res = await api.get(`/order?page=${page}&pageSize=${pageSize}`);
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
// ── Checkout（新流程）──
export const checkout = async (data) => {
  const res = await api.post("/payment/checkout", data);
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

// ── Avatar ──
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.put("/user/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
// 商品重新上架
export const adminPublishProduct = async (id) => {
  const res = await api.put(`/admin/product/${id}/publish`);
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
export const adminGetAllOrders = async (page = 1, pageSize = 20) => {
  const res = await api.get(`/admin/order?page=${page}&pageSize=${pageSize}`);
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
export const adminGetAllUsers = async (page = 1, pageSize = 20) => {
  const res = await api.get(`/admin/user?page=${page}&pageSize=${pageSize}`);
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
  const res = await api.put(`/admin/user/${id}/role`, { roleCode: role });
  return res.data;
};

// ── Admin Payment ──
export const adminGetAllPayments = async (page = 1, pageSize = 20) => {
  const res = await api.get(`/admin/payment?page=${page}&pageSize=${pageSize}`);
  return res.data;
};

export const adminVoidPayment = async (id, reason) => {
  const res = await api.put(`/admin/payment/${id}/void`, { reason });
  return res.data;
};
// ── Admin Review ──
export const adminGetAllReviews = async (page = 1, pageSize = 20) => {
  const res = await api.get(`/admin/review?page=${page}&pageSize=${pageSize}`);
  return res.data;
};

export const adminDeleteReview = async (id) => {
  const res = await api.delete(`/admin/review/${id}`);
  return res.data;
};
// ── Admin Stats ──
export const adminGetStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};


