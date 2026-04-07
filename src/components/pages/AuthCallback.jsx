import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../utils/tokenHelper";
import { useAuth } from "../../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { loginAs } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const displayName = params.get("displayName");
    const email = params.get("email");
    const role = params.get("role");

    if (!email) {
      navigate("/");
      return;
    }

    const user = {
      email,
      displayName,
      role,
    };

    saveUser(user);
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
