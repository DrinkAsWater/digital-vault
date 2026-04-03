import { PAYMENT_PROVIDERS } from '../../hook/useCheckout'

const METHODS = [
  {
    provider: PAYMENT_PROVIDERS.ECPAY,
    label: '💳 綠界 ECPay',
    style: { background: '#1c2340', color: 'var(--text)', border: '1px solid var(--border)' },
  },
  {
    provider: PAYMENT_PROVIDERS.LINEPAY,
    label: '💚 LINE Pay',
    style: { background: '#00C300', color: 'white' },
  },
  {
    provider: PAYMENT_PROVIDERS.CREDIT_CARD,
    label: '💳 信用卡',
    style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
  },
  {
    provider: PAYMENT_PROVIDERS.CVS,
    label: '🏪 超商繳費',
    style: { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' },
  },
]

const PaymentMethodList = ({ onSelect, loading }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
    {METHODS.map(({ provider, label, style }) => (
      <button
        key={provider}
        className="btn-google"
        style={style}
        onClick={() => onSelect(provider)}
        disabled={loading}
      >
        {label}
      </button>
    ))}
  </div>
)

export default PaymentMethodList