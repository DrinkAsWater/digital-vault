import { useNavigate } from "react-router-dom";
import { useUI } from "../../context/UIContext";
import { useCart } from "../../context/CartContext";
import useCheckout from "../../hook/useCheckout";
import PaymentMethodList from "../payment/PaymentMethodList";
import CreditCardForm from "../payment/CreditCardForm";
import CVSResult from "../payment/CVSResult";

const STEP_TITLE = {
  select: "選擇付款方式",
  creditcard: "信用卡付款",
  "cvs-result": "超商繳費",
};

const CheckoutModal = ({ existingOrderId = null, onClose }) => {
  const navigate = useNavigate();
  const { checkoutOpen, setCheckoutOpen, showToast } = useUI();
  const { pay } = useCart();

  // 從訂單頁開啟時用 onClose，從購物車開啟時用 setCheckoutOpen
  const isOpen = existingOrderId ? true : checkoutOpen;

  const handleSuccess = () => {
    if (existingOrderId) {
      onClose?.();
    } else {
      pay(navigate);
    }
    showToast("✅", "付款成功！");
  };

  const {
    step,
    loading,
    error,
    cvsResult,
    selectProvider,
    submitPayment,
    reset,
  } = useCheckout(handleSuccess, existingOrderId);

  if (!isOpen) return null;

  const handleClose = () => {
    reset();
    if (existingOrderId) {
      onClose?.();
    } else {
      setCheckoutOpen(false);
    }
  };

  const titleId = "checkout-modal-title";

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="modal">
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="關閉付款視窗"
        >
          ✕
        </button>
        <div className="modal-logo" aria-hidden="true">
          DIGITAL VAULT
        </div>
        <h3 id={titleId}>{STEP_TITLE[step]}</h3>
        <p className="modal-sub">台灣金流 · 安全加密交易</p>

        {error && step !== "creditcard" && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              background: "rgba(255,77,109,0.1)",
              border: "1px solid rgba(255,77,109,0.3)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "0.82rem",
              color: "var(--danger)",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {step === "select" && (
          <>
            <PaymentMethodList onSelect={selectProvider} loading={loading} />
            <div
              aria-hidden="true"
              style={{
                textAlign: "center",
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginTop: "16px",
              }}
            >
              付款完成後訂單狀態自動更新為 Paid
            </div>
          </>
        )}

        {step === "creditcard" && (
          <CreditCardForm
            onSubmit={(cardInfo) => submitPayment(cardInfo)}
            onBack={reset}
            loading={loading}
            error={error}
          />
        )}

        {step === "cvs-result" && cvsResult && (
          <CVSResult
            result={cvsResult}
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
