import { createContext, useContext, useState, useCallback } from "react";
import {
  clearAuth,
  getRefreshToken,
  getToken,
  getUser,
} from "../utils/tokenHelper";
import { apiLogout, createOrder, refreshToken } from "../utils/ApiFunction";

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [authProvider, setAuthProvider] = useState(null);
  const [sessionCart, setSessionCart] = useState([]);
  const [activeCart, setActiveCart] = useState(null);
  const [loginForCheckout, setLoginForCheckout] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState(null); // ✅ 新增：暫存 orderId

  const showToast = useCallback((icon, msg) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, icon, msg }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const isGuest = () => !user;

  const addToCart = useCallback(
    (product) => {
      setSessionCart((prev) => {
        if (prev.find((p) => p.id === product.id)) {
          showToast("ℹ️", "已在購物車中");
          return prev;
        }
        showToast("🛒", "已加入購物車" + (!user ? "（結帳時需要登入）" : ""));
        return [...prev, product];
      });
    },
    [user, showToast],
  );

  const removeFromCart = useCallback(
    (productId) => {
      setSessionCart((p) => p.filter((item) => item.id !== productId));
      showToast("🗑️", "已從購物車移除");
    },
    [showToast],
  );

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    setLoginForCheckout(false);
  }, []);
  const openLoginForCheckout = useCallback(() => {
    setLoginForCheckout(true);
    setLoginOpen(true);
  }, []);

  const loginAs = useCallback(
    (userData, provider) => {
      const wasCheckout = loginForCheckout;
      setUser(userData);
      setAuthProvider(provider);
      setLoginOpen(false);
      setLoginForCheckout(false);
      showToast("👋", `歡迎，${userData.displayName}！`);
      if (wasCheckout) {
        setTimeout(() => {
          showToast("🛒", "購物車已保留，繼續結帳...");
          setTimeout(() => setCheckoutOpen(true), 800);
        }, 400);
      }
    },
    [loginForCheckout, showToast],
  );

  const logout = useCallback(
    async (navigate) => {
      try {
        const token = getToken();
        const refreshToken = getRefreshToken();
        if (token) await apiLogout(token, refreshToken); // 呼叫後端黑名單 API
      } catch (e) {
        console.error("登出 API 失敗", e);
      } finally {
        setUser(null); // ✅ 立刻更新 state
        setAuthProvider(null);
        setSessionCart([]);
        clearAuth(); // 清除 localStorage
        navigate("/");
        showToast("👋", "已登出");
      }
    },
    [showToast],
  );

  const checkout = useCallback(() => {
    if (!sessionCart.length) {
      showToast("⚠️", "購物車是空的");
      return;
    }
    if (!user) {
      openLoginForCheckout();
      return;
    }
    setCheckoutOpen(true); // 只開 Modal，不建立訂單
  }, [sessionCart.length, user, showToast, openLoginForCheckout]);

  // ✅ pay：用 pendingOrderId 付款
  const pay = useCallback(async (navigate) => {
    setSessionCart([]);
    setPendingOrderId(null);
    setCheckoutOpen(false);
    navigate("/orders");
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        currentUserId: user?.id ?? null,
        authProvider,
        isGuest,
        sessionCart,
        addToCart,
        removeFromCart,
        activeCart,
        setActiveCart,
        loginForCheckout,
        toasts,
        loginOpen,
        openLogin,
        closeLogin,
        openLoginForCheckout,
        checkoutOpen,
        setCheckoutOpen,
        pendingOrderId, // ✅ 傳給 CheckoutModal 用
        loginAs,
        logout,
        checkout,
        pay,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
export { AppProvider };
