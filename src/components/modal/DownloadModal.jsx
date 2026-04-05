const DownloadModal = ({ downloads, onClose }) => {
  if (!downloads) return null;

  const titleId = "download-modal-title";

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="關閉下載視窗"
        >
          ✕
        </button>
        <div className="modal-logo" aria-hidden="true">
          DIGITAL VAULT
        </div>
        <h3 id={titleId}>下載商品</h3>
        <p className="modal-sub">
          訂單 {downloads.orderNo} · 連結 24 小時內有效
        </p>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "20px",
            listStyle: "none",
            padding: 0,
          }}
          aria-label="可下載商品清單"
        >
          {downloads.downloads.map((item) => (
            <li
              key={item.productId}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {item.productName}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted)",
                    marginTop: "4px",
                  }}
                >
                  <time dateTime={item.expiresAt}>
                    截止：{new Date(item.expiresAt).toLocaleString("zh-TW")}
                  </time>
                </div>
              </div>
              <a
                href={item.downloadUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`下載 ${item.productName}`}
              >
                <button className="btn-cart" style={{ whiteSpace: "nowrap" }}>
                  ⬇ 下載
                </button>
              </a>
            </li>
          ))}
        </ul>

        <button
          className="btn-outline"
          style={{ width: "100%", padding: "12px", marginTop: "20px" }}
          onClick={onClose}
          aria-label="關閉下載視窗"
        >
          關閉
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;
