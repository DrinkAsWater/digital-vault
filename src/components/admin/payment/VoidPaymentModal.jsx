import React, { useState } from 'react'

const VoidPaymentModal = ({ payment, onConfirm, onClose, loading }) => {
  const [reason, setReason] = useState('')

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="void-modal-title"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="admin-modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-logo" aria-hidden="true">DIGITAL VAULT</div>
        <h3 id="void-modal-title">作廢付款</h3>
        <p className="modal-sub">
          訂單 {payment.orderNo} · ${payment.amount}
        </p>
        <div className="form-group" style={{ marginTop: '20px' }}>
          <label htmlFor="void-reason">作廢原因 *</label>
          <textarea
            id="void-reason"
            className="admin-form-textarea"
            value={reason}
            onChange={e => setReason(e.target.value)}
            rows={3}
            placeholder="請填寫作廢原因"
            aria-required="true"
          />
        </div>
        <div className="admin-form-actions">
          <button
            className="btn-submit"
            style={{ background: 'var(--danger)' }}
            disabled={!reason.trim() || loading}
            onClick={() => onConfirm(reason)}
          >
            {loading ? '處理中...' : '確認作廢'}
          </button>
          <button className="btn-cancel" onClick={onClose}>取消</button>
        </div>
      </div>
    </div>
  )
}

export default VoidPaymentModal