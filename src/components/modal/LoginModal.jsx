import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const LoginModal = () => {
  const { loginOpen, closeLogin, loginAs, loginForCheckout } = useApp();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  if (!loginOpen) return null;

  const title = loginForCheckout ? "結帳前請先登入" : mode === "login" ? "歡迎回來" : "建立帳號";
  const sub = loginForCheckout ? "登入後購物車內容不會消失" : mode === "login" ? "登入你的帳號繼續購物" : "開始你的數位資產之旅";

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && closeLogin()}>
      <div className="modal">
        <button className="modal-close" onClick={closeLogin}>✕</button>
        <div className="modal-logo">DIGITAL VAULT</div>
        <h3>{title}</h3>
        <p className="modal-sub">{sub}</p>
        {loginForCheckout && (
          <div className="checkout-login-hint">🛒 你的購物車商品已暫存，登入後即可繼續結帳</div>
        )}
        <button className="btn-google" onClick={() => loginAs({ UserId: 1, Email: "user@gmail.com", DisplayName: "Google 使用者", Role: "user" }, "google")}>
          <div className="google-icon" />使用 Google 帳號登入
        </button>
        <div className="divider">或使用 Email</div>
        {mode === "login" ? (
          <>
            <div className="form-group">
              <label>電子郵件</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>密碼</label>
              <input type="password" placeholder="••••••••" />
            </div>
            <button className="btn-submit" onClick={() => loginAs({ UserId: 2, Email: email || "user@example.com", DisplayName: (email || "user@example.com").split("@")[0], Role: "user" }, "local")}>登入</button>
            <div className="modal-switch">還沒有帳號？<a onClick={() => setMode("register")}>立即註冊</a></div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>顯示名稱</label>
              <input type="text" placeholder="你的名字" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>電子郵件</label>
              <input type="email" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label>密碼</label>
              <input type="password" placeholder="至少 8 字元" />
            </div>
            <button className="btn-submit" onClick={() => loginAs({ UserId: 3, Email: regEmail || "new@example.com", DisplayName: name || "新用戶", Role: "user" }, "local")}>建立帳號</button>
            <div className="modal-switch">已有帳號？<a onClick={() => setMode("login")}>登入</a></div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginModal;