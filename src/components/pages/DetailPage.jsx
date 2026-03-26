import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Stars } from "../ui/Stars";
import PageStatus from "../ui/PageStatus";
import { reviews } from "../../data";
import { useProductDetail } from "../../hook/useProduct";

const INCLUDES = [
  "即時數位下載",
  "永久存取權限",
  "購買憑證（OrderItems 記錄）",
  "30 天退款保障",
];

const DetailPage = () => {
  const { id } = useParams();
  const { sessionCart, addToCart, isGuest } = useApp();
  const { product, loading, error } = useProductDetail(id);

  if (loading || error) return <PageStatus loading={loading} error={error} />;
  if (!product) return null;

  const inCart = sessionCart.includes(product.id);
  const pReviews = reviews.filter((r) => r.ProductId === product.id);

  return (
    <>
      <div className="detail-layout">
        <div className="detail-img">
          <img src={product.thumbnailUrl} alt={product.name} />
        </div>
        <div className="detail-info">
          <div className="detail-cat">{product.categoryName}</div>
          <div className="detail-title">{product.name}</div>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-includes">
            <h4>包含內容</h4>
            {INCLUDES.map((item) => (
              <div key={item} className="include-item">
                {item}
              </div>
            ))}
          </div>
          <div className="detail-price-row">
            <span className="detail-price">${product.price}</span>
            <button
              className={`btn-add-cart ${inCart ? "added" : ""}`}
              onClick={() => addToCart(product.id)}
            >
              {inCart ? "✓ 已加入購物車" : "加入購物車"}
            </button>
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            {isGuest()
              ? "🔒 結帳時需要登入，加入購物車無需帳號"
              : "付款後狀態：Orders.Status = Paid → Completed"}
          </div>
        </div>
      </div>
      <div className="reviews-section">
        <div className="section-title" style={{ marginBottom: "20px" }}>
          用戶評論 <span style={{ color: "var(--cyan)" }}>(Reviews)</span>
        </div>
        {pReviews.length === 0 ? (
          <div className="empty-state" style={{ padding: "40px" }}>
            <div className="empty-icon">💬</div>
            <h3>尚無評論</h3>
            <p>購買後即可留下評論</p>
          </div>
        ) : (
          pReviews.map((r) => (
            <div key={r.ReviewId} className="review-card">
              <div className="review-header">
                <div className="reviewer-avatar">{r.DisplayName[0]}</div>
                <div>
                  <div className="reviewer-name">{r.DisplayName}</div>
                  <Stars rating={r.Rating} size="0.7rem" />
                </div>
                <span className="review-date">{r.CreatedAt}</span>
              </div>
              <div className="review-text">{r.Comment}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default DetailPage;
