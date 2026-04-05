import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useUI } from "../../context/UIContext";
import EmptyState from "../ui/EmptyState";

const CartPage = () => {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const { sessionCart, removeFromCart, checkout } = useCart();
  const { openLoginForCheckout } = useUI();

  const validProds = sessionCart.filter((p) => p.isPublished);
  const total = validProds.reduce((s, p) => s + p.price, 0);

  return (
    <>
      <div className="page-title">
        購物車 <span>結帳</span>
      </div>
      <div className="cart-layout">
        <div>
          {isGuest() && sessionCart.length > 0 && (
            <div className="guest-checkout-bar">
              <div>
                <p>🔒 結帳前需要登入帳號</p>
                <span>商品已暫存在 Session，登入後不會消失</span>
              </div>
              <button
                className="btn-primary"
                style={{
                  padding: "8px 20px",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
                onClick={openLoginForCheckout}
              >
                登入 / 註冊
              </button>
            </div>
          )}

          {sessionCart.length === 0 ? (
            <EmptyState icon="🛒" title="購物車是空的">
              <p style={{ marginTop: "8px" }}>
                <button
                  className="btn-primary"
                  onClick={() => navigate("/store")}
                >
                  去逛逛
                </button>
              </p>
            </EmptyState>
          ) : (
            sessionCart.map((p) => (
              <div
                key={p.id}
                className="cart-item"
                style={!p.isPublished ? { opacity: 0.5 } : {}}
              >
                <div className="cart-item-img">
                  <img src={p.thumbnailUrl} alt={p.name} />
                </div>
                <div className="cart-item-info">
                  <div
                    className="cart-item-name"
                    style={
                      !p.isPublished ? { textDecoration: "line-through" } : {}
                    }
                  >
                    {p.name}
                  </div>
                  {p.isPublished ? (
                    <div className="cart-item-cat">{p.categoryName}</div>
                  ) : (
                    <div
                      className="cart-item-cat"
                      style={{ color: "var(--danger)" }}
                    >
                      此商品已下架
                    </div>
                  )}
                </div>
                {p.isPublished && (
                  <div className="cart-item-price">${p.price}</div>
                )}
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(p.id)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="summary-title">訂單摘要</div>
          {validProds.map((p) => (
            <div key={p.id} className="summary-row">
              <span>{p.name}</span>
              <span>${p.price}</span>
            </div>
          ))}
          <div className="summary-row total">
            <span>總計</span>
            <span>${total}</span>
          </div>
          <button className="btn-checkout" onClick={checkout}>
            前往付款
          </button>
          <div
            style={{
              textAlign: "center",
              fontSize: "0.75rem",
              color: "var(--muted)",
              marginTop: "12px",
            }}
          >
            🔒 付款後即時取得下載連結
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
