import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/pages/HomePage";
import StorePage from "./components/pages/StorePage";
import DetailPage from "./components/pages/DetailPage";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import ProfilePage from "./components/pages/ProfilePage";
import LoginModal from "./components/modal/LoginModal";
import CheckoutModal from "./components/modal/CheckoutModal";
import Toast from "./components/ui/Toast";
import AuthCallback from "./components/pages/AuthCallback";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/store/:id" element={<DetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </main>
          <Footer />
          <LoginModal />
          <CheckoutModal />
          <Toast />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
