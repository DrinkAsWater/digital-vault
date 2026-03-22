import { useApp } from '../../context/AppContext';
import ProductGrid from '../product/ProductGrid';
import { products, categories } from '../../data';

const StorePage = () => {
  const { activeCat, setActiveCat } = useApp();
  const list = activeCat === 1
    ? products.filter(p => p.IsPublished)
    : products.filter(p => p.IsPublished && p.CategoryId === activeCat);

  return (
    <>
      <div className="page-title">商店 <span>全部商品</span></div>
      <div className="cat-nav">
        {categories.map(c => (
          <button
            key={c.CategoryId}
            className={`cat-btn ${c.CategoryId === activeCat ? "active" : ""}`}
            onClick={() => setActiveCat(c.CategoryId)}
          >
            {c.Name}
          </button>
        ))}
      </div>
      <ProductGrid products={list} />
    </>
  );
}

export default StorePage;