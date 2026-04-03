const DownloadModal = ({ downloads, onClose }) => {
  if (!downloads) return null

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-logo">DIGITAL VAULT</div>
        <h3>下載商品</h3>
        <p className="modal-sub">訂單 {downloads.orderNo} · 連結 24 小時內有效</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          {downloads.downloads.map(item => (
            <div
              key={item.productId}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem' }}>
                  {item.productName}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '4px' }}>
                  截止：{new Date(item.expiresAt).toLocaleString('zh-TW')}
                </div>
              </div>
              <a href={item.downloadUrl} target="_blank" rel="noreferrer">
                <button className="btn-cart" style={{ whiteSpace: 'nowrap' }}>
                  ⬇ 下載
                </button>
              </a>
            </div>
          ))}
        </div>
        <button
          className="btn-outline"
          style={{ width: '100%', padding: '12px', marginTop: '20px' }}
          onClick={onClose}
        >
          關閉
        </button>
      </div>
    </div>
  )
}

export default DownloadModal