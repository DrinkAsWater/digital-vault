import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MENU_ITEMS = [
  { section: "主選單" },
  { path: "/admin", label: "總覽", icon: "◈", exact: true, require: "manager" },
  { path: "/admin/products", label: "商品管理", icon: "▦", require: "manager" },
  { path: "/admin/orders", label: "訂單管理", icon: "≡", require: "support" },
  { section: "系統" },
  { path: "/admin/users", label: "用戶管理", icon: "◉", require: "admin" },
  { path: "/admin/reviews", label: "評論管理", icon: "◎", require: "support" },
];

const canAccess = (user, require) => {
  if (!user?.role) return false;
  const roles = user.role.split(",").map((r) => r.trim());
  if (require === "admin") return roles.includes("admin");
  console.log("user.role:", user?.role);
  if (require === "manager")
    return roles.some((r) => ["admin", "manager"].includes(r));
  if (require === "support")
    return roles.some((r) => ["admin", "support"].includes(r));
  return false;
};

const AdminLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // console.log("AdminLayout user:", user); // ← 加這行
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-brand-name">Digital Vault</div>
          <div className="admin-sidebar-brand-sub">後台管理系統</div>
        </div>

        <nav className="admin-sidebar-nav">
          {MENU_ITEMS.map((item, i) => {
            if (item.section)
              return (
                <div key={i} className="admin-sidebar-section">
                  {item.section}
                </div>
              );
            if (!canAccess(user, item.require)) return null;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `admin-sidebar-link${isActive ? " active" : ""}`
                }
              >
                <span className="admin-sidebar-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            );
          })}
          <div className="admin-sidebar-divider" />
          <div className="admin-sidebar-link" onClick={() => navigate("/")}>
            <span className="admin-sidebar-icon">↩</span>
            返回前台
          </div>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-avatar">
            {user?.displayName?.[0]?.toUpperCase()}
          </div>
          <div>
            <div className="admin-sidebar-user-name">{user?.displayName}</div>
            <div className="admin-sidebar-user-role">{user?.role}</div>
          </div>
        </div>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
