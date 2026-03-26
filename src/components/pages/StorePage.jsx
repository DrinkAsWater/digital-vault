import { useApp } from "../../context/AppContext";
import { useCategories, useProducts } from "../../hook/useProduct";
import ProductGrid from "../product/ProductGrid";
import PageStatus from "../ui/PageStatus";

const StorePage = () => {
  const { activeCart, setActiveCart } = useApp();
  const { categories } = useCategories();
  const { products, loading, error } = useProducts(activeCart);

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <>
      <div className="page-title">
        商店 <span>全部商品</span>
      </div>
      <div className="cat-nav">
        {categories.map((c) => (
          <button
            key={c.id ?? "all"}
            className={`cat-btn ${c.id === activeCart ? "active" : ""}`}
            onClick={() => setActiveCart(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <ProductGrid products={products} />
    </>
  );
};

export default StorePage;
