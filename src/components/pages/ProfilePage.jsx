import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import EmptyState from '../ui/EmptyState';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, authProvider, orders, sessionCart, isGuest} = useApp();

  if (isGuest()) return (
    <div className="profile-page">
      <EmptyState icon="🔐" title="請先登入" />
    </div>
  );

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{user.DisplayName[0].toUpperCase()}</div>
        <div>
          <div className="profile-name">{user.DisplayName}</div>
          <div className="profile-email">{user.Email}</div>
          <div className="provider-badge">
            {authProvider === "google" ? "🔵 Google 登入" : "🔑 Email 登入"} · Provider = "{authProvider}"
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        {[{ value: orders.length, label: "訂單數" }, { value: sessionCart.length, label: "購物車" }].map(({ value, label }) => (
          <div key={label} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "var(--cyan)" }}>{value}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button className="btn-outline" style={{ width: "100%", padding: "12px" }} onClick={() => navigate("/orders")}>
          查看我的訂單
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;