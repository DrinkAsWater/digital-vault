import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UIProvider } from "./context/UIContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import LoginModal from "./components/modal/LoginModal";
import CheckoutModal from "./components/modal/CheckoutModal";
import Toast from "./components/ui/Toast";
import PageStatus from "./components/ui/PageStatus";
import { AuthRoute, AdminRoute } from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./components/pages/HomePage"));
const StorePage = lazy(() => import("./components/pages/StorePage"));
const DetailPage = lazy(() => import("./components/pages/DetailPage"));
const CartPage = lazy(() => import("./components/pages/CartPage"));
const OrdersPage = lazy(() => import("./components/pages/OrdersPage"));
const ProfilePage = lazy(() => import("./components/pages/ProfilePage"));
const AuthCallback = lazy(() => import("./components/pages/AuthCallback"));

const App = () => {
  return (
    <BrowserRouter>
      <UIProvider>
        <AuthProvider>
          <CartProvider>
            <div
              style={{
                background: "var(--bg)",
                minHeight: "100vh",
                color: "var(--text)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Header />
              <main>
                <Suspense fallback={<PageStatus loading={true} />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/store" element={<StorePage />} />
                    <Route path="/store/:id" element={<DetailPage />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route
                      path="/orders"
                      element={
                        <AuthRoute>
                          <OrdersPage />
                        </AuthRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <AuthRoute>
                          <ProfilePage />
                        </AuthRoute>
                      }
                    />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <LoginModal />
              <CheckoutModal />
              <Toast />
            </div>
          </CartProvider>
        </AuthProvider>
      </UIProvider>
    </BrowserRouter>
  );
};

export default App;
