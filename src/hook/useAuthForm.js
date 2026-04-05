import { useState } from "react";
import {
  clearAuth,
  saveAuth,
  getToken,
  getRefreshToken,
} from "../utils/tokenHelper";
import {
  login,
  register,
  apiLogout,
  refreshToken as apiRefresh,
} from "../utils/ApiFuction";

const useAuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      saveAuth(
        data.token,
        {
          id: data.id,
          email: data.email,
          displayName: data.displayName,
          role: data.role,
        },
        data.refreshToken,
      );
      onSuccess({
        id: data.id,
        email: data.email,
        displayName: data.displayName,
        role: data.role,
      });
    } catch (e) {
      setError(e.response?.data?.message || "登入失敗，請確認帳號密碼");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, displayName, password, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(email, displayName, password);
      onSuccess(data.message);
    } catch (err) {
      setError(err.response?.data?.message || "註冊失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (navigate) => {
    try {
      const token = getToken();
      if (token) await apiLogout(token);
    } catch (e) {
      console.error("登出 API 失敗", e);
    } finally {
      clearAuth();
      navigate("/");
    }
  };

  const handleRefresh = async () => {
    try {
      const oldToken = getToken();
      const refresh = getRefreshToken();
      if (!refresh || !oldToken) return null;
      const data = await apiRefresh(refresh, oldToken);
      saveAuth(
        data.token,
        {
          id: data.id,
          email: data.email,
          displayName: data.displayName,
          role: data.role,
        },
        data.refreshToken,
      );
      return data;
    } catch (e) {
      clearAuth();
      return null;
    }
  };

  return {
    loading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleLogout,
    handleRefresh,
  };
};

export default useAuthForm;
