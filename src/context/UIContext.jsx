import { createContext, useContext, useState, useCallback } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loginForCheckout, setLoginForCheckout] = useState(false);

  const showToast = useCallback((icon, msg) => {
    const id = Date.now() + Math.random();
    setToasts((p) => [...p, { id, icon, msg }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    setLoginForCheckout(false);
  }, []);
  const openLoginForCheckout = useCallback(() => {
    setLoginForCheckout(true);
    setLoginOpen(true);
  }, []);

  return (
    <UIContext.Provider
      value={{
        toasts,
        showToast,
        loginOpen,
        openLogin,
        closeLogin,
        checkoutOpen,
        setCheckoutOpen,
        loginForCheckout,
        setLoginForCheckout,
        openLoginForCheckout,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
