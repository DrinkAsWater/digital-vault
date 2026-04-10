const VoidDetailModal = ({ payment, onClose }) => {
  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="void-detail-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="admin-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-logo" aria-hidden="true">DIGITAL VAULT</div>
        <h3 id="void-detail-title">作廢詳情</h3>
        <p className="modal-sub">訂單 {payment.orderNo} · ${payment.amount}</p>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '6px' }}>作廢原因</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text)' }}>
              {payment.voidReason ?? '—'}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '6px' }}>作廢時間</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text)' }}>
              {payment.voidAt
                ? new Date(payment.voidAt).toLocaleString('zh-TW')
                : '—'}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '6px' }}>用戶</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text)' }}>{payment.userDisplayName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>{payment.userEmail}</div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button className="btn-cancel" style={{ width: '100%' }} onClick={onClose}>
            關閉
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoidDetailModal