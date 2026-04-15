import { useState, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { useCategories, useProducts } from "../../hook/useProduct";
import ProductGrid from "../product/ProductGrid";
import SkeletonGrid from "../ui/SkeletonGrid";
import ProductSearch from "../admin/product/ProductSearch";
import Pagination from "../ui/Pagination";

const StorePage = () => {
  const { activeCart, setActiveCart } = useCart();
  const { categories } = useCategories();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const [sortField, sortOrder] = sortBy ? sortBy.split("_") : [null, null];

  const handleSearch = useCallback((value) => {
    setKeyword(value);
    setPage(1);  // 搜尋時重置頁碼
  }, []);

  const handleCategoryChange = (id) => {
    setActiveCart(id);
    setPage(1);  // 切換分類時重置頁碼
  };


  const { products, totalPages, loading, error } = useProducts({
    categoryId: activeCart,
    keyword: keyword || null,
    sortBy: sortField,
    sortOrder: sortOrder,
    page,
    pageSize: 21
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
            onClick={() => handleCategoryChange(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <ProductSearch
        onSearch={handleSearch}
        sortBy={sortBy}
        onSortChange={(val) => { setSortBy(val); setPage(1); }}
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
        <SkeletonGrid count={12} />
      ) : (
        <>
        <ProductGrid products={products} />
        <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </>
  );
};

export default StorePage;
