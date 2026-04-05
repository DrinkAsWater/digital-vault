import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_MENUS = [
  {
    path: "/admin/products",
    icon: "📦",
    title: "商品管理",
    desc: "新增、編輯、下架商品",
    require: "manager",
  },
  {
    path: "/admin/orders",
    icon: "📋",
    title: "訂單管理",
    desc: "查看、處理所有訂單",
    require: "support",
  },
  {
    path: "/admin/users",
    icon: "👥",
    title: "用戶管理",
    desc: "管理用戶帳號與權限",
    require: "admin",
  },
  {
    path: "/admin/reviews",
    icon: "💬",
    title: "評論管理",
    desc: "審核、刪除不當評論",
    require: "support",
  },
];

const canAccess = (user, require) => {
  if (!user) return false;
  const roles = user.role?.split(",").map((r) => r.trim()) ?? [];
  if (require === "admin") return roles.includes("admin");
  if (require === "manager")
    return roles.some((r) => ["admin", "manager"].includes(r));
  if (require === "support")
    return roles.some((r) => ["admin", "support"].includes(r));
  return false;
};

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const accessible = ADMIN_MENUS.filter((m) => canAccess(user, m.require));

  return (
    <div style={{ padding: "60px", maxWidth: "900px", margin: "0 auto" }}>
      <div className="page-title">
        後台管理 <span>Admin</span>
      </div>
      <p
        style={{
          color: "var(--muted)",
          fontSize: "0.88rem",
          padding: "0 60px",
          marginBottom: "40px",
        }}
      >
        歡迎，{user?.displayName}。你有 {accessible.length} 個管理功能。
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          padding: "0 60px",
        }}
      >
        {accessible.map((menu) => (
          <div
            key={menu.path}
            className="card"
            onClick={() => navigate(menu.path)}
            style={{ padding: "28px", cursor: "pointer" }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "14px" }}>
              {menu.icon}
            </div>
            <div
              className="card-title"
              style={{ fontSize: "1.1rem", marginBottom: "8px" }}
            >
              {menu.title}
            </div>
            <div className="card-desc">{menu.desc}</div>
            <div
              style={{
                marginTop: "20px",
                fontSize: "0.78rem",
                color: "var(--cyan)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              進入管理 →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
