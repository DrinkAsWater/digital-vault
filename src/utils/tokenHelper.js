const USER_KEY = "dv_user";

// 儲存 user 資訊（Token 改用 HttpOnly Cookie，前端不再存）
export const saveUser = (user) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

// 取得 user
export const getUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// 清除登入資訊
export const clearAuth = () => localStorage.removeItem(USER_KEY);

// 是否已登入（改成檢查 user 是否存在）
export const isAuthenticated = () => !!getUser();
