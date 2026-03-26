import { useState } from "react";
import { useApp } from "../../context/AppContext";
import useAuth from "../../hook/useAuth"; // ← 修正路徑

const LoginModal = () => {
  const { loginOpen, closeLogin, loginAs, loginForCheckout } = useApp();
  const { loading, error, setError, handleLogin, handleRegister } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!loginOpen) return null;

  const title = loginForCheckout
    ? "結帳前請先登入"
    : mode === "login"
      ? "歡迎回來"
      : "建立帳號";
  const sub = loginForCheckout
    ? "登入後購物車內容不會消失"
    : mode === "login"
      ? "登入你的帳號繼續購物"
      : "開始你的數位資產之旅";

  const onLoginSuccess = (user) => {
    loginAs(
      { email: user.email, displayName: user.displayName, role: user.role },
      "local",
    );
  };

  const onGoogleSuccess = () => {
    // Google OAuth 做好後再串接，目前先模擬
    loginAs(
      { email: "user@gmail.com", displayName: "Google 使用者", role: "User" },
      "google",
    );
  };

  const onRegisterSuccess = (message) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg("");
      setMode("login");
    }, 2000);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError(null);
    setSuccessMsg("");
  };

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && closeLogin()}
    >
      <div className="modal">
        <button className="modal-close" onClick={closeLogin}>
          ✕
        </button>
        <div className="modal-logo">DIGITAL VAULT</div>
        <h3>{title}</h3>
        <p className="modal-sub">{sub}</p>

        {loginForCheckout && (
          <div className="checkout-login-hint">
            🛒 你的購物車商品已暫存，登入後即可繼續結帳
          </div>
        )}

        {/* 錯誤訊息 */}
        {error && (
          <div
            style={{
              background: "rgba(255,77,109,0.1)",
              border: "1px solid rgba(255,77,109,0.3)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "0.82rem",
              color: "var(--danger)",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {/* 成功訊息 */}
        {successMsg && (
          <div
            style={{
              background: "rgba(0,229,160,0.1)",
              border: "1px solid rgba(0,229,160,0.3)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "0.82rem",
              color: "var(--green)",
              marginBottom: "16px",
            }}
          >
            {successMsg}
          </div>
        )}

        {/* Google 登入 */}
        <button className="btn-google" onClick={onGoogleSuccess}>
          <div className="google-icon" />
          使用 Google 帳號登入
        </button>

        <div className="divider">或使用 Email</div>

        {mode === "login" ? (
          <>
            <div className="form-group">
              <label>電子郵件</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>密碼</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn-submit"
              onClick={() => handleLogin(email, password, onLoginSuccess)}
              disabled={loading}
            >
              {loading ? "登入中..." : "登入"}
            </button>
            <div className="modal-switch">
              還沒有帳號？<a onClick={() => switchMode("register")}>立即註冊</a>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label>顯示名稱</label>
              <input
                type="text"
                placeholder="你的名字"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>電子郵件</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>密碼</label>
              <input
                type="password"
                placeholder="至少 8 字元"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </div>
            <button
              className="btn-submit"
              onClick={() =>
                handleRegister(
                  regEmail,
                  displayName,
                  regPassword,
                  onRegisterSuccess,
                )
              }
              disabled={loading}
            >
              {loading ? "註冊中..." : "建立帳號"}
            </button>
            <div className="modal-switch">
              已有帳號？<a onClick={() => switchMode("login")}>登入</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
