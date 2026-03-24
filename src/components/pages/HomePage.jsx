import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProductCard from '../product/ProductCard';
import { getProducts } from '../../utils/ApiFuction';

const STATS = [
  { num: "200+", label: "數位商品" },
  { num: "4.9★", label: "平均評分" },
  { num: "5K+", label: "滿意客戶" },
  { num: "即時", label: "下載交付" },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { openLogin } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 頁面載入時取得前4筆商品
  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" /><div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-tag">✦ 數位資產商店</div>
          <h2>探索頂級<br /><em>數位資源</em></h2>
          <p>AI 提示詞 · UI 套件 · 模板 · 程式資源<br />即購即用，無需等待配送</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/store")}>瀏覽商店</button>
            <button className="btn-outline" onClick={openLogin}>登入帳號</button>
          </div>
        </div>
      </section>

      <div className="stats">
        {STATS.map(s => (
          <div key={s.label} className="stat">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-title">熱門商品 <span>精選</span></div>
          <button
            className="btn-outline"
            style={{ padding: "8px 18px", fontSize: "0.82rem" }}
            onClick={() => navigate("/store")}
          >
            查看全部 →
          </button>
        </div>
        <div className="products" style={{ padding: 0 }}>
          {loading && <div style={{ color: 'var(--muted)' }}>載入中...</div>}
          {error && <div style={{ color: 'var(--danger)' }}>錯誤：{error}</div>}
          {!loading && !error && products.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onDetail={id => navigate(`/store/${id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;