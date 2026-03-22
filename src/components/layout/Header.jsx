import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { sessionCart, user, openLogin, logout } = useApp();

  return (
    <header className="dv-header">
      <div className="dv-logo" onClick={() => navigate("/")}>
        Digital<span>Vault</span>
      </div>
      <nav className="dv-nav">
        <a onClick={() => navigate("/")}>首頁</a>
        <a onClick={() => navigate("/store")}>商店</a>
        <button className="nav-cart" onClick={() => navigate("/cart")}>
          🛒 購物車 <span className="cart-badge">{sessionCart.length}</span>
        </button>
        {!user ? (
          <>
            <div className="guest-badge">
              <div className="guest-dot" />訪客
            </div>
            <button className="btn-login" onClick={openLogin}>登入 / 註冊</button>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className="nav-avatar" onClick={() => navigate("/profile")} title={user.DisplayName}>
              {user.DisplayName[0].toUpperCase()}
            </div>
            <button className="nav-cart" style={{ fontSize: "0.78rem" }} onClick={() => navigate("/orders")}>
              我的訂單
            </button>
            <button
              className="btn-login"
              style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}
              onClick={() => logout(navigate)}
            >
              登出
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;