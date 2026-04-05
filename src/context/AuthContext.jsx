import { createContext, useContext, useState, useCallback } from "react";
import {
  clearAuth,
  getUser,
  getToken,
  getRefreshToken,
} from "../utils/tokenHelper";
import { apiLogout } from "../utils/ApiFuction"; 
import { useUI } from "./UIContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [authProvider, setAuthProvider] = useState(null);
  const {
    showToast,
    loginForCheckout,
    setLoginForCheckout,
    setCheckoutOpen,
    closeLogin,
  } = useUI();

  const isGuest = () => !user;

  const loginAs = useCallback(
    (userData, provider) => {
      const wasCheckout = loginForCheckout;
      setUser(userData);
      setAuthProvider(provider);
      closeLogin();
      setLoginForCheckout(false);
      showToast("👋", `歡迎，${userData.displayName}！`);
      if (wasCheckout) {
        setTimeout(() => {
          showToast("🛒", "購物車已保留，繼續結帳...");
          setTimeout(() => setCheckoutOpen(true), 800);
        }, 400);
      }
    },
    [
      loginForCheckout,
      showToast,
      closeLogin,
      setLoginForCheckout,
      setCheckoutOpen,
    ],
  );

  const logout = useCallback(
    async (navigate) => {
      try {
        const token = getToken();
        const refreshToken = getRefreshToken();
        if (token) await apiLogout(token, refreshToken);
      } catch (e) {
        console.error("登出 API 失敗", e);
      } finally {
        setUser(null);
        setAuthProvider(null);
        clearAuth();
        navigate("/");
        showToast("👋", "已登出");
      }
    },
    [showToast],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        authProvider,
        isGuest,
        loginAs,
        logout,
        currentUserId: user?.id ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
