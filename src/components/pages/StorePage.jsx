import { useApp } from "../../context/AppContext";
import ProductGrid from "../product/ProductGrid";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "../../utils/ApiFuction";

const StorePage = () => {
  const { activeCart, setActiveCart } = useApp();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 頁面載入時取得所有分類
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);

        if (activeCart === undefined) {
          setActiveCart(null); // 預設全部
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  // 當分類切換時重新取得商品
  useEffect(() => {
    if (activeCart === undefined) return;

    setLoading(true);

    getProducts(activeCart)
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [activeCart]);

  if (loading)
    return (
      <div style={{ padding: "60px", color: "var(--muted)" }}>載入中...</div>
    );
  if (error)
    return (
      <div style={{ padding: "60px", color: "var(--danger)" }}>
        錯誤：{error}
      </div>
    );

  return (
    <>
      <div className="page-title">
        商店 <span>全部商品</span>
      </div>
      <div className="cat-nav">
        {categories.map((c) => (
          <button
            key={c.id}
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
