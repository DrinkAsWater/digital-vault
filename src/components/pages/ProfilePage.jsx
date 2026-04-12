import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { usePurchases } from "../../hook/useProfile";
import AvatarUpload from "../profile/AvatarUpload";
import EditDisplayName from "../profile/EditDisplayName";
import EditPassword from "../profile/EditPassword";
import PurchaseList from "../profile/PurchaseList";
import PageStatus from "../ui/PageStatus";
import { saveUser } from "../../utils/tokenHelper";

const TABS = [
  { key: "profile", label: "個人資料" },
  { key: "security", label: "帳號安全" },
  { key: "purchases", label: "已購商品" },
  { key: "orders", label: "我的訂單" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isGuest, loginAs } = useAuth();
  const { openLogin } = useUI();
  const { purchases, loading, error } = usePurchases();
  const [activeTab, setActiveTab] = useState("profile");

  if (isGuest())
    return (
      <div className="profile-page">
        <div className="empty-state">
          <div className="empty-icon">🔐</div>
          <h3>請先登入</h3>
          <p style={{ marginTop: "12px" }}>
            <button className="btn-primary" onClick={openLogin}>
              登入
            </button>
          </p>
        </div>
      </div>
    );

  const handleAvatarSuccess = (newAvatarUrl) => {
    const updatedUser = { ...user, avatarUrl: newAvatarUrl };
    saveUser(updatedUser);
    loginAs(updatedUser, user.provider);
  };

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);

  return (
    <div
      style={{ maxWidth: "860px", margin: "0 auto", padding: "0 60px 60px" }}
    >
      {/* Banner */}
      <div className="profile-banner">
        <div className="profile-banner-grid" />
      </div>

      {/* Header */}
      <div className="profile-header">
        <div className="profile-header-top">
          <div className="profile-avatar-wrap">
            <AvatarUpload
              user={user}
              onSuccess={handleAvatarSuccess}
              size={88}
            />
          </div>
          <div className="profile-user-info">
            <div className="profile-user-name">{user.displayName}</div>
            <div className="profile-user-meta">
              {user.email}
              <span className="profile-user-badge">{user.role}</span>
            </div>
          </div>
          <div className="profile-stats">
            {[
              { value: purchases.length, label: "已購商品" },
              { value: `$${totalSpent}`, label: "總消費" },
            ].map((s) => (
              <div key={s.label} className="profile-stat">
                <div className="profile-stat-num">{s.value}</div>
                <div className="profile-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              className={`profile-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() =>
                tab.key === "orders"
                  ? navigate("/orders")
                  : setActiveTab(tab.key)
              }
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="profile-content">
        {/* 個人資料 */}
        {activeTab === "profile" && (
          <div className="profile-grid">
            <EditDisplayName user={user} />
            <div className="profile-info-card">
              <div className="profile-info-title">帳號資訊</div>
              {[
                { label: "Email", value: user.email },
                {
                  label: "登入方式",
                  value:
                    user.provider === "Google"
                      ? "🔵 Google 登入"
                      : "🔑 Email 登入",
                },
                { label: "角色", value: user.role },
              ].map((item) => (
                <div key={item.label} className="profile-info-row">
                  <span className="profile-info-key">{item.label}</span>
                  <span className="profile-info-val">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 帳號安全 */}
        {activeTab === "security" && (
          <div style={{ maxWidth: "480px" }}>
            <EditPassword />
          </div>
        )}

        {/* 已購商品 */}
        {activeTab === "purchases" &&
          (loading ? (
            <PageStatus loading={true} />
          ) : error ? (
            <PageStatus error={error} />
          ) : (
            <PurchaseList />
          ))}
      </div>
    </div>
  );
};

export default ProfilePage;
