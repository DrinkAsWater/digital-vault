import { useState } from 'react'
import PageStatus from '../ui/PageStatus'
import EmptyState from '../ui/EmptyState'
import VoidPaymentModal from '../admin/payment/VoidPaymentModal'
import { useAdminPayments } from '../../hook/useAdminPayments'

const PROVIDER_LABEL = {
    'ECPay': 'ECPay',
    'LinePay': 'LinePay',
    'CreditCard': '信用卡',
    'CVS': '超商',
}

const STATUS_BADGE = {
    0: 'badge-pending',   // Pending
    1: 'badge-paid',      // Paid
    2: 'badge-inactive',  // Failed
    3: 'badge-role',      // Refunded
}

const STATUS_LABEL = {
    0: '待付款',
    1: '已付款',
    2: '付款失敗',
    3: '已退款',
}

const AdminPaymentPage = () => {
    const { payments, loading, error, voidPayment } = useAdminPayments()
    const [voidingId, setVoidingId] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState(null)

    if (loading || error) return <PageStatus loading={loading} error={error} />

    const handleVoidConfirm = async (reason) => {
        setVoidingId(selectedPayment.id)
        await voidPayment(selectedPayment.id, reason)
        setVoidingId(null)
        setSelectedPayment(null)
    }

    return (
        <div className="admin-page">
            <div className="admin-page-header">
                <div>
                    <div className="admin-page-title">付款管理 <span>Payments</span></div>
                    <div className="admin-page-sub">共 {payments.length} 筆付款記錄</div>
                </div>
            </div>

            {payments.length === 0 ? (
                <EmptyState icon="💳" title="尚無付款記錄" />
            ) : (
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>訂單編號</th>
                            <th>用戶</th>
                            <th>付款方式</th>
                            <th>金額</th>
                            <th>狀態</th>
                            <th>付款時間</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>
                                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem' }}>
                                        {payment.orderNo}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.85rem' }}>{payment.userDisplayName}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{payment.userEmail}</div>
                                </td>
                                <td>
                                    <span className="badge badge-role">
                                        {PROVIDER_LABEL[payment.provider] ?? '未知'}
                                    </span>
                                </td>
                                <td style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: 'var(--cyan)' }}>
                                    ${payment.amount}
                                </td>
                                <td>
                                    <td>
                                        <span className={`badge ${payment.isVoid ? 'badge-inactive' : STATUS_BADGE[payment.status]}`}>
                                            {payment.isVoid ? '已作廢' : STATUS_LABEL[payment.status] ?? '未知'}
                                        </span>
                                    </td>
                                </td>
                                <td style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                                    {payment.paidAt
                                        ? new Date(payment.paidAt).toLocaleDateString('zh-TW')
                                        : '—'}
                                </td>
                                <td>
                                    {payment.status === 1 && !payment.isVoid && (
                                        <button
                                            className="btn-delete"
                                            disabled={voidingId === payment.id}
                                            onClick={() => setSelectedPayment(payment)}
                                        >
                                            作廢
                                        </button>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {selectedPayment && (
                <VoidPaymentModal
                    payment={selectedPayment}
                    onConfirm={handleVoidConfirm}
                    onClose={() => setSelectedPayment(null)}
                    loading={voidingId === selectedPayment.id}
                />
            )}
        </div>
    )
}

export default AdminPaymentPage