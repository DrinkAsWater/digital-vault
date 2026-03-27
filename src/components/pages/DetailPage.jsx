// pages/DetailPage.jsx
import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import PageStatus from "../ui/PageStatus";
import { useProductDetail } from "../../hook/useProduct";
import ReviewSection from "../review/ReviewSection.jsx";

const INCLUDES = [
  "即時數位下載",
  "永久存取權限",
  "購買憑證（OrderItems 記錄）",
  "30 天退款保障",
];
// 模擬用，交易實作後移除
const MOCK_ORDER_ID = "00000000-0000-0000-0000-000000000001";

const DetailPage = () => {
  const { id } = useParams();
  const { sessionCart, addToCart, isGuest, currentUser, userOrderId } = useApp();
  const { product, loading, error } = useProductDetail(id);

  if (loading || error) return <PageStatus loading={loading} error={error} />;
  if (!product) return null;

  const inCart = sessionCart.includes(product.id);

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
              <div key={item} className="include-item">{item}</div>
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

      {/* 評論區塊 — 替換原本的靜態 reviews */}
      <ReviewSection
        productId={product.id}
        currentUserId={currentUser?.id ?? null}
        //userOrderId={userOrderId ?? null} 
        userOrderId={isGuest() ? null : MOCK_ORDER_ID}  // 模擬用，交易實作後移除
      />
    </>
  );
};

export default DetailPage;