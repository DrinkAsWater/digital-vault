import { createContext, useContext, useState, useCallback } from "react";
import { createOrder } from "../utils/ApiFuction";
import { useUI } from "./UIContext";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [sessionCart, setSessionCart] = useState([]);
  const [activeCart, setActiveCart] = useState(null);
  const { showToast, openLoginForCheckout, setCheckoutOpen } = useUI();
  const { user } = useAuth();

  const addToCart = useCallback(
    (product) => {
      setSessionCart((prev) => {
        if (prev.find((p) => p.id === product.id)) {
          showToast("ℹ️", "已在購物車中");
          return prev;
        }
        showToast(
          "🛒",
          `${product.name} 已加入購物車` + (!user ? "（結帳時需要登入）" : ""),
        );
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

  const clearCart = useCallback(() => setSessionCart([]), []);

  const checkout = useCallback(async () => {
    if (!sessionCart.length) {
      showToast("⚠️", "購物車是空的");
      return;
    }
    if (!user) {
      openLoginForCheckout();
      return;
    }
    try {
      const productIds = sessionCart.map((p) => p.id);
      const order = await createOrder(productIds);
      setCheckoutOpen(true);
    } catch (err) {
      showToast("❌", err.response?.data?.message || "建立訂單失敗");
    }
  }, [sessionCart, user, showToast, openLoginForCheckout, setCheckoutOpen]);

  // 付款成功後清空購物車
  const pay = useCallback(
    (navigate) => {
      setSessionCart([]);
      setCheckoutOpen(false);
      navigate("/orders");
    },
    [setCheckoutOpen],
  );

  return (
    <CartContext.Provider
      value={{
        sessionCart,
        addToCart,
        removeFromCart,
        clearCart,
        activeCart,
        setActiveCart,
        checkout,
        pay,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
