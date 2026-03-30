import PageStatus from "../ui/PageStatus";
import { usePurchases } from "../../hook/useProfile";

const PurchaseList = () => {
  const { purchases, loading, error } = usePurchases();

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "24px",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          marginBottom: "16px",
          color: "var(--cyan)",
        }}
      >
        已購商品
      </div>
      {purchases.length === 0 ? (
        <div className="empty-state" style={{ padding: "20px" }}>
          <div className="empty-icon">📦</div>
          <h3>尚無已購商品</h3>
        </div>
      ) : (
        purchases.map((p) => (
          <div
            key={p.productId}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "12px 0",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "45px",
                borderRadius: "8px",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={p.thumbnailUrl}
                alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginTop: "2px",
                }}
              >
                {p.categoryName} ·{" "}
                {new Date(p.purchasedAt).toLocaleDateString("zh-TW")}
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                color: "var(--cyan)",
              }}
            >
              ${p.price}
            </div>
            {p.downloadUrl && (
              <a href={p.downloadUrl} target="_blank" rel="noreferrer">
                <button className="btn-cart" style={{ whiteSpace: "nowrap" }}>
                  下載
                </button>
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseList;
