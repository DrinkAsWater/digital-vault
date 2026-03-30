import { useState } from "react";
import { clearAuth, saveAuth } from "../utils/tokenHelper";
import { login, register } from "../utils/ApiFuction";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      //儲存token和資訊
      saveAuth(data.token, {
        id: data.id, // ✅ 加這行
        email: data.email,
        displayName: data.displayName,
        role: data.role,
      });
      onSuccess({
        id: data.id, // ✅ 加這行
        email: data.email,
        displayName: data.displayName,
        role: data.role,
      });
    } catch (e) {
      setError(e.response?.data.message || "登入失敗，請確認帳號密碼");
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
  const handleLogout = (navigate) => {
    clearAuth();
    navigate("/");
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
export default useAuth;
