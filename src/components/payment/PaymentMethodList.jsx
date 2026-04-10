import { PAYMENT_PROVIDERS } from "../../hook/useCheckout";

const METHODS = [
  {
    provider: PAYMENT_PROVIDERS.ECPAY,
    label: "💳 綠界 ECPay",
    style: {
      background: "#1c2340",
      color: "var(--muted)",
      border: "1px solid var(--border)",
    },
    disabled: true,
    tag: "即將推出",
  },
  {
    provider: PAYMENT_PROVIDERS.LINEPAY,
    label: "💚 LINE Pay",
    style: {
      background: "#1c2340",
      color: "var(--muted)",
      border: "1px solid var(--border)",
    },
    disabled: true,
    tag: "即將推出",
  },
  {
    provider: PAYMENT_PROVIDERS.CREDIT_CARD,
    label: "💳 信用卡",
    style: {
      background: "var(--surface)",
      color: "var(--text)",
      border: "1px solid var(--border)",
    },
    disabled: false,
  },
  {
    provider: PAYMENT_PROVIDERS.CVS,
    label: "🏪 超商繳費",
    style: {
      background: "var(--surface)",
      color: "var(--text)",
      border: "1px solid var(--border)",
    },
    disabled: false,
  },
];

const PaymentMethodList = ({ onSelect, loading }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      marginTop: "20px",
    }}
  >
    {METHODS.map(({ provider, label, style, disabled, tag }) => (
      <button
        key={provider}
        className="btn-google"
        style={{
          ...style,
          position: "relative",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        onClick={() => !disabled && onSelect(provider)}
        disabled={loading || disabled}
      >
        {label}
        {tag && (
          <span
            style={{
              position: "absolute",
              right: "12px",
              fontSize: "0.65rem",
              background: "var(--border)",
              color: "var(--muted)",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            {tag}
          </span>
        )}
      </button>
    ))}
  </div>
);

export default PaymentMethodList;
