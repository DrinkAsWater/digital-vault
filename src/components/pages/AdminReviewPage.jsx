import EmptyState from "../ui/EmptyState";
import PageStatus from "../ui/PageStatus";
import { Stars } from "../ui/Stars";



const AdminReviewPage = () => {
  const reviews = [];
  const loading = false;
  const error = null;

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <div style={{ padding: "60px", maxWidth: "900px", margin: "0 auto" }}>
      <div className="page-title" style={{ padding: "0 0 32px 0" }}>
        評論管理 <span>Reviews</span>
      </div>

      {reviews.length === 0 ? (
        <EmptyState icon="💬" title="尚無評論資料">
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: "var(--muted)",
            }}
          >
            等待後端 API 串接完成
          </p>
        </EmptyState>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-avatar">
                {r.userDisplayName?.[0] ?? "?"}
              </div>
              <div>
                <div className="reviewer-name">{r.userDisplayName}</div>
                <Stars rating={r.rating} size="0.7rem" />
              </div>
              <span className="review-date">
                {new Date(r.createdAt).toLocaleDateString("zh-TW")}
              </span>
              <div style={{ marginLeft: "auto" }}>
                <button className="btn-delete">刪除</button>
              </div>
            </div>
            <div className="review-text">{r.comment}</div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "0.75rem",
                color: "var(--muted)",
              }}
            >
              商品：{r.productName}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminReviewPage;
