import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MENU_ITEMS = [
  {
    path: "/admin/products",
    icon: "▦",
    title: "商品管理",
    desc: "新增、編輯、下架商品",
    require: "manager",
  },
  {
    path: "/admin/orders",
    icon: "≡",
    title: "訂單管理",
    desc: "查看、處理所有訂單",
    require: "support",
  },
  {
    path: "/admin/users",
    icon: "◉",
    title: "用戶管理",
    desc: "管理帳號與權限",
    require: "admin",
  },
  {
    path: "/admin/reviews",
    icon: "◎",
    title: "評論管理",
    desc: "審核、刪除不當評論",
    require: "support",
  },
];

const canAccess = (user, require) => {
  if (!user?.role) return false;
  const roles = user.role.split(",").map((r) => r.trim());
  if (require === "admin") return roles.includes("admin");
  if (require === "manager")
    return roles.some((r) => ["admin", "manager"].includes(r));
  if (require === "support")
    return roles.some((r) => ["admin", "support"].includes(r));
  return false;
};

const today = new Date().toLocaleDateString("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const accessible = MENU_ITEMS.filter((m) => canAccess(user, m.require));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">
            總覽 <span>Dashboard</span>
          </div>
          <div className="admin-page-sub">
            歡迎回來，{user?.displayName} · 今日 {today}
          </div>
        </div>
        <button
          className="btn-primary"
          style={{ padding: "9px 20px" }}
          onClick={() => navigate("/admin/products")}
        >
          + 新增商品
        </button>
      </div>

      {/* 統計卡 - 等後端 API 完成後串接真實數據 */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card accent">
          <div className="admin-stat-label">總訂單數</div>
          <div className="admin-stat-value">—</div>
          <div className="admin-stat-delta up">等待串接</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">本月營收</div>
          <div className="admin-stat-value">—</div>
          <div className="admin-stat-delta up">等待串接</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">總用戶數</div>
          <div className="admin-stat-value">—</div>
          <div className="admin-stat-delta up">等待串接</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">待處理訂單</div>
          <div className="admin-stat-value">—</div>
          <div className="admin-stat-delta down">等待串接</div>
        </div>
      </div>

      {/* 快速管理 */}
      <div className="admin-section-title">快速管理</div>
      <div className="admin-menu-grid">
        {accessible.map((menu) => (
          <div
            key={menu.path}
            className="admin-menu-card"
            onClick={() => navigate(menu.path)}
          >
            <div className="admin-menu-icon-wrap">{menu.icon}</div>
            <div>
              <div className="admin-menu-card-title">{menu.title}</div>
              <div className="admin-menu-card-desc">{menu.desc}</div>
            </div>
            <div className="admin-menu-card-arrow">→</div>
          </div>
        ))}
      </div>

      {/* 最近訂單 - 等後端 API 完成後串接 */}
      <div className="admin-section-header">
        <div className="admin-section-title" style={{ margin: 0, flex: 1 }}>
          最近訂單
        </div>
        <span
          className="admin-view-all"
          onClick={() => navigate("/admin/orders")}
        >
          查看全部 →
        </span>
      </div>
      <div className="admin-order-list" style={{ marginTop: "14px" }}>
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--muted)",
            fontSize: "0.85rem",
          }}
        >
          等待後端 Admin API 串接完成
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
