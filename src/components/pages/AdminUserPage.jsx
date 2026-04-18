import { useState, useMemo } from "react";
import PageStatus from "../ui/PageStatus";
import EmptyState from "../ui/EmptyState";
import { useAdminUsers } from "../../hook/useAdminUsers";
import Pagination from "../ui/Pagination";

const ROLE_OPTIONS = ["user", "manager", "support", "admin"];

const AdminUserPage = () => {
  const {
    users,
    loading,
    error,
    deactivate,
    activate,
    updateRole,
    page,
    totalPages,
    setPage,
  } = useAdminUsers();
  const [updatingId, setUpdatingId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchKeyword =
        !keyword ||
        u.displayName?.toLowerCase().includes(keyword.toLowerCase()) ||
        u.email?.toLowerCase().includes(keyword.toLowerCase());
      const matchRole = filterRole === "all" || u.roles?.includes(filterRole);
      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "active" ? u.isActive : !u.isActive);
      return matchKeyword && matchRole && matchStatus;
    });
  }, [users, keyword, filterRole, filterStatus]);

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  const handleRoleChange = async (id, role) => {
    setUpdatingId(id);
    await updateRole(id, role);
    setUpdatingId(null);
  };

  const handleToggleActive = async (user) => {
    setUpdatingId(user.id);
    if (user.isActive) {
      await deactivate(user.id);
    } else {
      await activate(user.id);
    }
    setUpdatingId(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">
            用戶管理 <span>Users</span>
          </div>
          <div className="admin-page-sub">共 {filteredUsers.length} 位用戶</div>
        </div>
      </div>

      {/* 搜尋 + 篩選列 */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <input
            type="text"
            placeholder="搜尋用戶名稱或 Email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 14px 9px 36px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "9px",
              color: "var(--text)",
              fontSize: "0.88rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
              fontSize: "0.85rem",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: "9px 14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "9px",
            color: "var(--text)",
            fontSize: "0.88rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">全部角色</option>
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "9px 14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "9px",
            color: "var(--text)",
            fontSize: "0.88rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">全部狀態</option>
          <option value="active">啟用</option>
          <option value="inactive">停用</option>
        </select>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          icon="◉"
          title={
            keyword || filterRole !== "all" || filterStatus !== "all"
              ? "找不到符合的用戶"
              : "尚無用戶"
          }
        />
      ) : (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>用戶</th>
                <th>登入方式</th>
                <th>目前角色</th>
                <th>變更角色</th>
                <th>狀態</th>
                <th>註冊時間</th>
                <th style={{ textAlign: "center" }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>
                      {user.displayName}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                      {user.email}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-role">
                      {user.provider === "Google" ? "🔵 Google" : "📧 Email"}
                    </span>
                  </td>
                  <td>
                    <div
                      style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}
                    >
                      {user.roles?.length > 0 ? (
                        user.roles.map((r) => (
                          <span key={r} className="badge badge-role">
                            {r}
                          </span>
                        ))
                      ) : (
                        <span className="badge badge-inactive">無角色</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <select
                      className="admin-form-select"
                      style={{
                        padding: "6px 10px",
                        fontSize: "0.78rem",
                        width: "auto",
                      }}
                      defaultValue=""
                      disabled={updatingId === user.id}
                      onChange={(e) => {
                        if (e.target.value)
                          handleRoleChange(user.id, e.target.value);
                      }}
                    >
                      <option value="" disabled>
                        選擇角色
                      </option>
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span
                      className={`badge ${user.isActive ? "badge-active" : "badge-inactive"}`}
                    >
                      {user.isActive ? "啟用" : "停用"}
                    </span>
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                    {new Date(user.createdAt).toLocaleDateString("zh-TW")}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className={user.isActive ? "btn-delete" : "btn-edit"}
                      disabled={updatingId === user.id}
                      onClick={() => handleToggleActive(user)}
                    >
                      {updatingId === user.id
                        ? "處理中..."
                        : user.isActive
                          ? "停用"
                          : "啟用"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default AdminUserPage;
