import { useState } from 'react'

const CreditCardForm = ({ onSubmit, onBack, loading, error }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const handleSubmit = () => {
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) return
    onSubmit({ cardNumber, cardHolder, expiryDate, cvv })
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {error && (
        <div style={{ background: 'rgba(255,77,109,0.1)', border: '1px solid rgba(255,77,109,0.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '0.82rem', color: 'var(--danger)', marginBottom: '16px' }}>
          {error}
        </div>
      )}
      <div className="form-group">
        <label>卡號</label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={e => setCardNumber(e.target.value)}
          maxLength={19}
        />
      </div>
      <div className="form-group">
        <label>持卡人姓名</label>
        <input
          type="text"
          placeholder="JOHN DOE"
          value={cardHolder}
          onChange={e => setCardHolder(e.target.value)}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="form-group">
          <label>有效期限</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            maxLength={5}
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="password"
            placeholder="•••"
            value={cvv}
            onChange={e => setCvv(e.target.value)}
            maxLength={4}
          />
        </div>
      </div>
      <button
        className="btn-submit"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? '處理中...' : '確認付款'}
      </button>
      <button
        className="btn-outline"
        style={{ width: '100%', padding: '12px', marginTop: '10px' }}
        onClick={onBack}
        disabled={loading}
      >
        ← 返回
      </button>
    </div>
  )
}

export default CreditCardForm