import EmptyState from "../ui/EmptyState";
import PageStatus from "../ui/PageStatus";


const AdminUserPage = () => {
  const users = [];
  const loading = false;
  const error = null;

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <div style={{ padding: "60px", maxWidth: "1000px", margin: "0 auto" }}>
      <div className="page-title" style={{ padding: "0 0 32px 0" }}>
        用戶管理 <span>Users</span>
      </div>

      {users.length === 0 ? (
        <EmptyState icon="👥" title="尚無用戶資料">
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: "var(--muted)",
            }}
          >
            等待後端 API 串接完成
          </p>
        </EmptyState>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                fontSize: "0.82rem",
                color: "var(--muted)",
              }}
            >
              <th style={{ padding: "12px", textAlign: "left" }}>顯示名稱</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>角色</th>
              <th style={{ padding: "12px", textAlign: "left" }}>狀態</th>
              <th style={{ padding: "12px", textAlign: "left" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td style={{ padding: "14px 12px", fontSize: "0.88rem" }}>
                  {u.displayName}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                  }}
                >
                  {u.email}
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      background: "var(--cyan-dim)",
                      color: "var(--cyan)",
                      border: "1px solid rgba(0,247,255,0.3)",
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      background: u.isActive
                        ? "rgba(0,229,160,0.12)"
                        : "rgba(255,77,109,0.12)",
                      color: u.isActive ? "var(--green)" : "var(--danger)",
                      border: `1px solid ${u.isActive ? "rgba(0,229,160,0.3)" : "rgba(255,77,109,0.3)"}`,
                    }}
                  >
                    {u.isActive ? "啟用" : "停用"}
                  </span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-edit">編輯角色</button>
                    <button className="btn-delete">
                      {u.isActive ? "停用" : "啟用"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserPage;
