import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const CheckoutModal = () => {
  const navigate = useNavigate();
  const { checkoutOpen, setCheckoutOpen, pay } = useApp();

  if (!checkoutOpen) return null;

  return (
    <div
      className="overlay"
      onClick={(e) => e.target === e.currentTarget && setCheckoutOpen(false)}
    >
      <div className="modal">
        <button className="modal-close" onClick={() => setCheckoutOpen(false)}>
          ✕
        </button>
        <div className="modal-logo">DIGITAL VAULT</div>
        <h3>選擇付款方式</h3>
        <p className="modal-sub">台灣金流 · 安全加密交易</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            className="btn-google"
            style={{
              background: "#1c2340",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
            onClick={() => pay("ECPay", navigate)}
          >
            💳 綠界 ECPay 信用卡
          </button>
          <button
            className="btn-google"
            style={{ background: "#00C300", color: "white" }}
            onClick={() => pay("LinePay", navigate)}
          >
            💚 LINE Pay
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: "0.75rem",
            color: "var(--muted)",
            marginTop: "16px",
          }}
        >
          付款完成後訂單狀態自動更新為 Paid
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
