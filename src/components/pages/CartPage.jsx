import { useApp } from '../../context/AppContext';
import EmptyState from '../ui/EmptyState';
import { products } from '../../data';
import { getCartName } from '../../utils/Helper';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { sessionCart, removeFromCart, isGuest, openLoginForCheckout, checkout} = useApp();
  const cartProds = sessionCart.map(pid => products.find(x => x.ProductId === pid)).filter(Boolean);
  const validProds = cartProds.filter(p => p.IsPublished);
  const total = validProds.reduce((s, p) => s + p.Price, 0);

  return (
    <>
      <div className="page-title">購物車 <span>結帳</span></div>
      <div className="cart-layout">
        <div>
          {isGuest() && sessionCart.length > 0 && (
            <div className="guest-checkout-bar">
              <div>
                <p>🔒 結帳前需要登入帳號</p>
                <span>商品已暫存在 Session，登入後不會消失</span>
              </div>
              <button className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.85rem", whiteSpace: "nowrap" }} onClick={openLoginForCheckout}>
                登入 / 註冊
              </button>
            </div>
          )}
          {sessionCart.length === 0 ? (
            <EmptyState icon="🛒" title="購物車是空的">
              <p style={{ marginTop: "8px" }}>
                <button className="btn-primary" onClick={() => navigate("/store")}>去逛逛</button>
              </p>
            </EmptyState>
          ) : (
            cartProds.map(p => (
              <div key={p.ProductId} className="cart-item" style={!p.IsPublished ? { opacity: 0.5 } : {}}>
                <div className="cart-item-img"><img src={p.ThumbnailUrl} alt={p.Name} /></div>
                <div className="cart-item-info">
                  <div className="cart-item-name" style={!p.IsPublished ? { textDecoration: "line-through" } : {}}>{p.Name}</div>
                  {p.IsPublished
                    ? <div className="cart-item-cat">{getCartName(p.CategoryId)}</div>
                    : <div className="cart-item-cat" style={{ color: "var(--danger)" }}>此商品已下架</div>
                  }
                </div>
                {p.IsPublished && <div className="cart-item-price">${p.Price}</div>}
                <button className="btn-remove" onClick={() => removeFromCart(p.ProductId)}>✕</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <div className="summary-title">訂單摘要</div>
          {validProds.map(p => (
            <div key={p.ProductId} className="summary-row">
              <span>{p.Name}</span><span>${p.Price}</span>
            </div>
          ))}
          <div className="summary-row total"><span>總計</span><span>${total}</span></div>
          <button className="btn-checkout" onClick={checkout}>前往付款</button>
          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--muted)", marginTop: "12px" }}>
            🔒 付款後即時取得下載連結
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;