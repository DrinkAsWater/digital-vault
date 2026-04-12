import { useState, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { useCategories, useProducts } from "../../hook/useProduct";
import ProductGrid from "../product/ProductGrid";
import SkeletonGrid from "../ui/SkeletonGrid";
import ProductSearch from "../admin/product/ProductSearch";

const StorePage = () => {
  const { activeCart, setActiveCart } = useCart();
  const { categories } = useCategories();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [sortField, sortOrder] = sortBy ? sortBy.split("_") : [null, null];

  const handleSearch = useCallback((value) => {
    setKeyword(value);
  }, []);

  const { products, loading, error } = useProducts({
    categoryId: activeCart,
    keyword: keyword || null,
    sortBy: sortField,
    sortOrder: sortOrder,
  });

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
      <ProductSearch
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      {error ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "var(--danger)",
          }}
        >
          載入失敗，請重新整理
        </div>
      ) : loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  );
};

export default StorePage;
