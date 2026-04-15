import { useState } from "react";
import { saveUser, clearAuth } from "../utils/tokenHelper";
import { login, register, apiLogout } from "../utils/ApiFunction";

const useAuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      // Token 已存在 HttpOnly Cookie，只需儲存 user 資訊
      const userData = {
        id: data.id,
        email: data.email,
        displayName: data.displayName,
        role: data.role,
        avatarUrl: data.avatarUrl ?? null,
      };
      saveUser(userData);
      onSuccess(userData);
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
      await apiLogout(); // Cookie 由後端清除
    } catch (e) {
      console.error("登出 API 失敗", e);
    } finally {
      clearAuth(); // 清 localStorage 的 user
      navigate("/");
    }
  };

  return {
    loading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuthForm;
