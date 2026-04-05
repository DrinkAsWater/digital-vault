import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useAuthForm from "../../hook/useAuthForm";
import { useUI } from "../../context/UIContext";
import { googleLogin } from "../../utils/ApiFuction";

const LoginModal = () => {
  const { loginAs } = useAuth();
  const { loginOpen, closeLogin, loginForCheckout } = useUI();
  const { loading, error, setError, handleLogin, handleRegister } =
    useAuthForm();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!loginOpen) return null;

  const titleId = "login-modal-title";
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
      {
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        id: user.id,
        avatarUrl: user.avatarUrl,
      },
      "local",
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
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && closeLogin()}
    >
      <div className="modal">
        <button
          className="modal-close"
          onClick={closeLogin}
          aria-label="關閉登入視窗"
        >
          ✕
        </button>
        <div className="modal-logo">DIGITAL VAULT</div>
        <h3 id={titleId}>{title}</h3>
        <p className="modal-sub">{sub}</p>

        {loginForCheckout && (
          <div className="checkout-login-hint" role="note">
            🛒 你的購物車商品已暫存，登入後即可繼續結帳
          </div>
        )}

        {error && (
          <div
            role="alert"
            aria-live="assertive"
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

        {successMsg && (
          <div
            role="status"
            aria-live="polite"
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

        <button
          className="btn-google"
          onClick={googleLogin}
          aria-label="使用 Google 帳號登入"
        >
          <div className="google-icon" aria-hidden="true" />
          使用 Google 帳號登入
        </button>

        <div className="divider" aria-hidden="true">
          或使用 Email
        </div>

        {mode === "login" ? (
          <>
            <div className="form-group">
              <label htmlFor="login-email">電子郵件</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">密碼</label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-required="true"
              />
            </div>
            <button
              className="btn-submit"
              onClick={() => handleLogin(email, password, onLoginSuccess)}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "登入中..." : "登入"}
            </button>
            <div className="modal-switch">
              還沒有帳號？
              <a
                onClick={() => switchMode("register")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && switchMode("register")}
              >
                立即註冊
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="reg-name">顯示名稱</label>
              <input
                id="reg-name"
                type="text"
                placeholder="你的名字"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="nickname"
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-email">電子郵件</label>
              <input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                autoComplete="email"
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">密碼</label>
              <input
                id="reg-password"
                type="password"
                placeholder="至少 8 字元"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                autoComplete="new-password"
                aria-required="true"
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
              aria-busy={loading}
            >
              {loading ? "註冊中..." : "建立帳號"}
            </button>
            <div className="modal-switch">
              已有帳號？
              <a
                onClick={() => switchMode("login")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && switchMode("login")}
              >
                登入
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
