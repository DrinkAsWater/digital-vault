import { useState } from 'react'
import PageStatus from '../ui/PageStatus'
import EmptyState from '../ui/EmptyState'
import { useAdminOrders } from '../../hook/useAdminOrders'

const STATUS_OPTIONS = [
  { value: 0, label: '未付款' },
  { value: 1, label: '已付款' },
  { value: 2, label: '已完成' },
  { value: 3, label: '已取消' },
]

const STATUS_BADGE = {
  0: 'badge-pending',
  1: 'badge-paid',
  2: 'badge-completed',
  3: 'badge-inactive',
}

const getStatusLabel = (status) =>
  STATUS_OPTIONS.find(s => s.value === status)?.label ?? '未知'

const AdminOrderPage = () => {
  const { orders, loading, error, updateStatus } = useAdminOrders()
  const [updatingId, setUpdatingId] = useState(null)

  if (loading || error) return <PageStatus loading={loading} error={error} />

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id)
    await updateStatus(id, parseInt(status))
    setUpdatingId(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">訂單管理 <span>Orders</span></div>
          <div className="admin-page-sub">共 {orders.length} 筆訂單</div>
        </div>
      </div>

      {orders.length === 0 ? (
        <EmptyState icon="≡" title="尚無訂單" />
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>訂單編號</th>
              <th>用戶</th>
              <th>商品</th>
              <th>金額</th>
              <th>狀態</th>
              <th>建立時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem' }}>
                    {order.orderNo}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem' }}>{order.userDisplayName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{order.userEmail}</div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {order.items?.map(item => (
                      <span key={item.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px 8px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                        {item.productName}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: 'var(--cyan)' }}>
                  ${order.totalAmount}
                </td>
                <td>
                  <span className={`badge ${STATUS_BADGE[order.status]}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                  {new Date(order.createdAt).toLocaleDateString('zh-TW')}
                </td>
                <td>
                  <select
                    className="admin-form-select"
                    style={{ padding: '6px 10px', fontSize: '0.78rem', width: 'auto' }}
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={e => handleStatusChange(order.id, e.target.value)}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminOrderPage