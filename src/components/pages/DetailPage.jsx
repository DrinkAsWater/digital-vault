import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import PageStatus from "../ui/PageStatus";
import { useProductDetail } from "../../hook/useProduct";
import { useOrderIdByProduct } from "../../hook/useOrders";
import ReviewSection from "../review/ReviewSection";

const INCLUDES = [
  "即時數位下載",
  "永久存取權限",
  "購買憑證（OrderItems 記錄）",
  "30 天退款保障",
];

const DetailPage = () => {
  const { id } = useParams();
  const { isGuest, currentUserId } = useAuth();
  const { sessionCart, addToCart } = useCart();
  const { product, loading, error } = useProductDetail(id);
  const { orderId } = useOrderIdByProduct(isGuest() ? null : id);

  console.log("productId:", id);
  console.log("orderId:", orderId);
  console.log("isGuest:", isGuest());

  if (loading || error) return <PageStatus loading={loading} error={error} />;
  if (!product) return null;

  const inCart = sessionCart.some((p) => p.id === product.id);

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
              onClick={() => addToCart(product)}
            >
              {inCart ? "✓ 已加入購物車" : "加入購物車"}
            </button>
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            {isGuest()
              ? "🔒 結帳時需要登入，加入購物車無需帳號"
              : "付款後即可下載並留下評論"}
          </div>
        </div>
      </div>

      <ReviewSection
        productId={product.id}
        currentUserId={currentUserId}
        userOrderId={isGuest() ? null : orderId}
      />
    </>
  );
};

export default DetailPage;
