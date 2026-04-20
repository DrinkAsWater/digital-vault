const PROVIDER_LABEL = {
  CreditCard: "💳 信用卡",
  CVS: "🏪 超商",
};

const AdminNotification = ({ notifications, connected, onClear }) => {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {/* 標題列 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            即時通知
          </div>
          {/* 連線狀態燈 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.72rem",
              color: connected ? "var(--green)" : "var(--danger)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: connected ? "var(--green)" : "var(--danger)",
              }}
            />
            {connected ? "已連線" : "未連線"}
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={onClear}
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "4px 10px",
              fontSize: "0.72rem",
              color: "var(--muted)",
              cursor: "pointer",
            }}
          >
            清除全部
          </button>
        )}
      </div>

      {/* 通知列表 */}
      {notifications.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "0.82rem",
            color: "var(--muted)",
          }}
        >
          目前沒有新通知
        </div>
      ) : (
        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {notifications.map((n, i) => (
            <div
              key={`${n.orderId}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 14px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "1.2rem" }}>
                {n.provider === "CVS" ? "🏪" : "💳"}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {n.orderNo}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginTop: "2px",
                  }}
                >
                  {PROVIDER_LABEL[n.provider] ?? n.provider} ·{" "}
                  {new Date(n.createdAt).toLocaleTimeString("zh-TW")}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  color: "var(--cyan)",
                  fontSize: "0.9rem",
                }}
              >
                ${n.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotification;
