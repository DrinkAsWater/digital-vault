const TOKEN_KEY = "dv_token";
const USER_KEY = "dv_user";
//儲存token 和 user
export const saveAuth = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

//取得token
export const getToken = () => localStorage.getItem(TOKEN_KEY);

//取得user
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
// 清除登入資訊
export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
// 是否已登入
export const isAuthenticated = () => !!getToken();
