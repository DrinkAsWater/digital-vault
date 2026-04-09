import { useState } from 'react'
import PageStatus from '../ui/PageStatus'
import EmptyState from '../ui/EmptyState'
import { useAdminUsers } from '../../hook/useAdminUsers'

const ROLE_OPTIONS = ['user', 'manager', 'support', 'admin']

const AdminUserPage = () => {
  const { users, loading, error, deactivate, activate, updateRole } = useAdminUsers()
  const [updatingId, setUpdatingId] = useState(null)

  if (loading || error) return <PageStatus loading={loading} error={error} />

  const handleRoleChange = async (id, role) => {
    setUpdatingId(id)
    await updateRole(id, role)
    setUpdatingId(null)
  }

  const handleToggleActive = async (user) => {
    setUpdatingId(user.id)
    if (user.isActive) {
      await deactivate(user.id)
    } else {
      await activate(user.id)
    }
    setUpdatingId(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">用戶管理 <span>Users</span></div>
          <div className="admin-page-sub">共 {users.length} 位用戶</div>
        </div>
      </div>

      {users.length === 0 ? (
        <EmptyState icon="◉" title="尚無用戶" />
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>用戶</th>
              <th>登入方式</th>
              <th>角色</th>
              <th>狀態</th>
              <th>註冊時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{user.displayName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{user.email}</div>
                </td>
                <td>
                  <span className="badge badge-role">
                    {user.provider === 'Google' ? '🔵 Google' : '📧 Email'}
                  </span>
                </td>
                <td>
                  <select
                    className="admin-form-select"
                    style={{ padding: '6px 10px', fontSize: '0.78rem', width: 'auto' }}
                    value={user.role}
                    disabled={updatingId === user.id}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                  >
                    {ROLE_OPTIONS.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <span className={`badge ${user.isActive ? 'badge-active' : 'badge-inactive'}`}>
                    {user.isActive ? '啟用' : '停用'}
                  </span>
                </td>
                <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                  {new Date(user.createdAt).toLocaleDateString('zh-TW')}
                </td>
                <td>
                  <button
                    className={user.isActive ? 'btn-delete' : 'btn-edit'}
                    disabled={updatingId === user.id}
                    onClick={() => handleToggleActive(user)}
                  >
                    {updatingId === user.id ? '處理中...' : user.isActive ? '停用' : '啟用'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminUserPage