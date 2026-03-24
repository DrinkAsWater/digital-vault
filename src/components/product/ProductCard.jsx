import { useApp } from "../../context/AppContext";

const ProductCard = ({ product, onDetail }) => {
  const { sessionCart, addToCart } = useApp();
  const inCart = sessionCart.includes(product.id);

  return (
    <div className="card">
      <div className="card-img" onClick={() => onDetail(product.id)}>
        <img src={product.thumbnailUrl} alt={product.name} loading="lazy" />
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
              addToCart(product.id);
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