import ProductCard from "./ProductCard";
import EmptyState from "../ui/EmptyState";
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ products, emptyText = "此分類暫無商品" }) => {
  const navigate = useNavigate();
  if (!products.length) return <EmptyState icon="📦" title={emptyText} />;
  return (
    <div className="products">
      {products.map((p) => (
        <ProductCard
          key={p.ProductId}
          product={p}
          onDetail={(id) => navigate(`/store/${id}`)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
