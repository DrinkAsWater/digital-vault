import { createContext, useContext, useState, useCallback } from 'react';
import { products } from '../data';

const AppContext = createContext(null);

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);
  const [sessionCart, setSessionCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeCart, setActiveCart] = useState(null);
  const [loginForCheckout, setLoginForCheckout] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const showToast = useCallback((icon, msg) => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, icon, msg }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);

  const isGuest = () => !user;

  const addToCart = useCallback((productId) => {
    setSessionCart(prev => {
      if (prev.includes(productId)) { showToast("ℹ️", "已在購物車中"); return prev; }
      const p = products.find(x => x.ProductId === productId);
      const hint = !user ? "（結帳時需要登入）" : "";
      showToast("🛒", `${p.Name} 已加入購物車 ${hint}`);
      return [...prev, productId];
    });
  }, [user, showToast]);

  const removeFromCart = useCallback((productId) => {
    setSessionCart(p => p.filter(id => id !== productId));
    showToast("🗑️", "已從購物車移除");
  }, [showToast]);

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => { setLoginOpen(false); setLoginForCheckout(false); }, []);
  const openLoginForCheckout = useCallback(() => { setLoginForCheckout(true); setLoginOpen(true); }, []);

  const loginAs = useCallback((userData, provider, navigate) => {
    const wasCheckout = loginForCheckout;
    setUser(userData); setAuthProvider(provider);
    setLoginOpen(false); setLoginForCheckout(false);
    showToast("👋", `歡迎，${userData.DisplayName}！`);
    if (wasCheckout) {
      setTimeout(() => {
        showToast("🛒", "購物車已保留，繼續結帳...");
        setTimeout(() => setCheckoutOpen(true), 800);
      }, 400);
    }
  }, [loginForCheckout, showToast]);

  const logout = useCallback((navigate) => {
    setUser(null); setAuthProvider(null); setSessionCart([]);
    navigate("/");
    showToast("👋", "已登出");
  }, [showToast]);

  const checkout = useCallback(() => {
    if (!sessionCart.length) { showToast("⚠️", "購物車是空的"); return; }
    if (!user) { openLoginForCheckout(); return; }
    setCheckoutOpen(true);
  }, [sessionCart.length, user, showToast, openLoginForCheckout]);

  const pay = useCallback((provider, navigate) => {
    setCheckoutOpen(false);
    const validItems = sessionCart
      .map(pid => products.find(x => x.ProductId === pid && x.IsPublished))
      .filter(Boolean);
    const orderItems = validItems.map((p, i) => ({
      OrderItemId: Date.now() + i, ProductId: p.ProductId,
      ProductName: p.Name, UnitPrice: p.Price, Quantity: 1, SubTotal: p.Price,
    }));
    const total = orderItems.reduce((s, i) => s + i.SubTotal, 0);
    const order = {
      OrderId: Date.now(),
      UserId: user.UserId,
      OrderNo: "DV-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      TotalAmount: total, Status: "Paid",
      CreatedAt: new Date().toLocaleDateString("zh-TW"),
      items: orderItems,
      Payment: { Provider: provider, TransactionId: "TXN-" + Date.now(), Amount: total, Status: "Paid" },
    };
    setOrders(p => [order, ...p]);
    setSessionCart([]);
    navigate("/orders");
    showToast("✅", `付款成功！訂單 ${order.OrderNo} 已建立`);
  }, [sessionCart, user, showToast]);

  return (
    <AppContext.Provider value={{
      user, authProvider, isGuest,
      sessionCart, addToCart, removeFromCart,
      orders, activeCart, setActiveCart,
      loginForCheckout, toasts,
      loginOpen, openLogin, closeLogin, openLoginForCheckout,
      checkoutOpen, setCheckoutOpen,
      loginAs, logout, checkout, pay, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
export { AppProvider };