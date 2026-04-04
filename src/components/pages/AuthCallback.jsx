import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { saveAuth } from "../../utils/tokenHelper";

// 解析 JWT payload
const parseJwt = (token) => {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

const AuthCallback = () => {
  const navigate = useNavigate();
  const { loginAs } = useApp();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/");
      return;
    }

    // 解析 JWT 取得 user 資訊
    const payload = parseJwt(token);
    if (!payload) {
      navigate("/");
      return;
    }

    const user = {
      id: payload.sub,
      email: payload.email,
      displayName:
        payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      role: payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    };

    saveAuth(token, user);
    loginAs(user, "google");
    navigate("/");
  }, [navigate, loginAs]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "var(--muted)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "16px" }}>⏳</div>
        <div>Google 登入處理中...</div>
      </div>
    </div>
  );
};

export default AuthCallback;
