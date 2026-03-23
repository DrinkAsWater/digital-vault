import { useApp } from '../../context/AppContext';
import { Stars } from '../ui/Stars';
import { getCartName } from '../../utils/Helper';

const ProductCard = ({ product, onDetail }) => {
  const { sessionCart, addToCart } = useApp();
  const inCart = sessionCart.includes(product.ProductId);
  return (
    <div className="card">
      <div className="card-img" onClick={() => onDetail(product.id)}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="card-cat">{getCartName(product.CategoryId)}</span>
      </div>
      <div className="card-body">
        <div className="card-title" onClick={() => onDetail(product.ProductId)}>
          {product.Name}
        </div>
        <div className="card-desc">{product.Description}</div>
        <div className="card-rating">
          <Stars rating={product.avgRating} />
          {product.avgRating} ({product.reviewCount} 則評論)
        </div>
        <div className="card-footer">
          <span className="card-price">${product.Price}</span>
          <button
            className={`btn-cart ${inCart ? "added" : ""}`}
            onClick={e => { e.stopPropagation(); addToCart(product.ProductId); }}
          >
            {inCart ? "✓ 已加入" : "加入購物車"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;