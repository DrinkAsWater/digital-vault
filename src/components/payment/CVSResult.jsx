import { useState, useEffect } from "react";
import { getPaymentByOrder } from "../../utils/ApiFuction";

const CVSResult = ({ result, onClose, onSuccess }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [paid, setPaid] = useState(false);

  const formatCode = (code) => code.match(/.{1,4}/g) || [];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.paymentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 倒數計時
  useEffect(() => {
    if (!result.expiresAt) return;
    const interval = setInterval(() => {
      const diff = new Date(result.expiresAt) - new Date();
      if (diff <= 0) {
        setTimeLeft("已過期");
        clearInterval(interval);
        return;
      }
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [result.expiresAt]);

  // Polling 確認付款狀態
  useEffect(() => {
    if (!result?.orderId) return;

    let count = 0;
    const interval = setInterval(async () => {
      try {
        count++;
        if (count > 60) {
          clearInterval(interval);
          return;
        }

        // 改用 api 實例，自動帶 Cookie
        const payments = await getPaymentByOrder(result.orderId);
        if (!payments?.length) return;

        const latest = payments[payments.length - 1];
        if (latest.status === 1) {
          clearInterval(interval);
          setPaid(true);
          setTimeout(() => onSuccess?.(), 2000);
        }
      } catch (err) {
        console.error("polling error:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [result?.orderId, onSuccess]);

  return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <div style={{ fontSize: "2.8rem", marginBottom: "12px" }}>🏪</div>

      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1.15rem",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        超商繳費代碼
      </div>

      {paid ? (
        <div style={{ padding: "40px 0" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>✅</div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--green)",
            }}
          >
            付款成功！
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              color: "var(--muted)",
              marginTop: "8px",
            }}
          >
            即將跳轉到訂單頁...
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid rgba(0,255,255,0.25)",
              borderRadius: "16px",
              padding: "24px 16px",
              margin: "18px 0",
              boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--muted)",
                marginBottom: "10px",
              }}
            >
              繳費代碼
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {formatCode(result.paymentCode).map((chunk, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "var(--cyan)",
                    background: "rgba(0,255,255,0.08)",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    letterSpacing: "2px",
                  }}
                >
                  {chunk}
                </span>
              ))}
            </div>
            <button
              onClick={handleCopy}
              style={{
                fontSize: "0.75rem",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid var(--cyan)",
                background: "transparent",
                color: "var(--cyan)",
                cursor: "pointer",
              }}
            >
              {copied ? "已複製 ✓" : "複製代碼"}
            </button>
            {timeLeft && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color:
                    timeLeft === "已過期" ? "var(--danger)" : "var(--muted)",
                  marginTop: "10px",
                }}
              >
                剩餘時間：{timeLeft}
              </div>
            )}
            {result.expiresAt && (
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginTop: "6px",
                }}
              >
                截止時間：{new Date(result.expiresAt).toLocaleString("zh-TW")}
              </div>
            )}
          </div>

          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--muted)",
              marginBottom: "22px",
            }}
          >
            系統將自動確認付款狀態...
          </div>

          <button
            className="btn-primary"
            style={{ width: "100%", padding: "14px", fontWeight: 600 }}
            onClick={onClose}
          >
            我知道了
          </button>
        </>
      )}
    </div>
  );
};

export default CVSResult;
