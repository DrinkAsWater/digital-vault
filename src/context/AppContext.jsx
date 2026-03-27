import { createContext, useContext, useState, useCallback } from "react";
import { clearAuth, getUser } from "../utils/tokenHelper";
import { createOrder } from "../utils/ApiFuction";

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

  const showToast = useCallback((icon, msg) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, icon, msg }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const isGuest = () => !user;

  const addToCart = useCallback(
    (productId) => {
      setSessionCart((prev) => {
        if (prev.find((p) => p.id === productId.id)) {
          showToast("ℹ️", "已在購物車中");
          return prev;
        }
        showToast("🛒", "已加入購物車" + (!user ? "（結帳時需要登入）" : ""));
        return [...prev, productId];
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
    (navigate) => {
      setUser(null);
      setAuthProvider(null);
      setSessionCart([]);
      clearAuth();
      navigate("/");
      showToast("👋", "已登出");
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
    setCheckoutOpen(true);
  }, [sessionCart.length, user, showToast, openLoginForCheckout]);

  const pay = useCallback(
    async (provider, navigate) => {
      setCheckoutOpen(false);
      try {
        const productIds = sessionCart.map((p) => p.id); // 只傳 id 給後端
        const order = await createOrder(productIds);
        setSessionCart([]);
        navigate("/orders");
        showToast("✅", `付款成功！訂單 ${order.orderNo} 已建立`);
      } catch (err) {
        showToast("❌", err.response?.data?.message || "建立訂單失敗");
      }
    },
    [sessionCart, showToast],
  );

  return (
    <AppContext.Provider
      value={{
        user,
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
