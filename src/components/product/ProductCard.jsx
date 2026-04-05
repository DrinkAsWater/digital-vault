import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, onDetail }) => {
  const { sessionCart, addToCart } = useCart();
  const inCart = sessionCart.some((p) => p.id === product.id);

  return (
    <div className="card">
      <div className="card-img" onClick={() => onDetail(product.id)}>
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        <span className="card-cat">{product.categoryName}</span>
      </div>
      <div className="card-body">
        <div className="card-title" onClick={() => onDetail(product.id)}>
          {product.name}
        </div>
        <div className="card-desc">{product.description}</div>
        <div className="card-footer">
          <span className="card-price">${product.price}</span>
          <button
            className={`btn-cart ${inCart ? "added" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            {inCart ? "✓ 已加入" : "加入購物車"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
