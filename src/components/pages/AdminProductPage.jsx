import { useState } from "react";
import PageStatus from "../ui/PageStatus";
import EmptyState from "../ui/EmptyState";


const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 等後端 API 完成後串接
  // useEffect(() => { fetchAdminProducts() }, [])

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <div style={{ padding: "60px", maxWidth: "1000px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div className="page-title" style={{ padding: 0 }}>
          商品管理 <span>Products</span>
        </div>
        <button className="btn-primary" style={{ padding: "10px 24px" }}>
          + 新增商品
        </button>
      </div>

      {products.length === 0 ? (
        <EmptyState icon="📦" title="尚無商品資料">
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.85rem",
              color: "var(--muted)",
            }}
          >
            等待後端 API 串接完成
          </p>
        </EmptyState>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                fontSize: "0.82rem",
                color: "var(--muted)",
              }}
            >
              <th style={{ padding: "12px", textAlign: "left" }}>商品名稱</th>
              <th style={{ padding: "12px", textAlign: "left" }}>分類</th>
              <th style={{ padding: "12px", textAlign: "left" }}>價格</th>
              <th style={{ padding: "12px", textAlign: "left" }}>狀態</th>
              <th style={{ padding: "12px", textAlign: "left" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td style={{ padding: "14px 12px", fontSize: "0.88rem" }}>
                  {p.name}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    fontSize: "0.85rem",
                    color: "var(--muted)",
                  }}
                >
                  {p.categoryName}
                </td>
                <td
                  style={{
                    padding: "14px 12px",
                    color: "var(--cyan)",
                    fontWeight: 700,
                  }}
                >
                  ${p.price}
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      background: p.isPublished
                        ? "rgba(0,229,160,0.12)"
                        : "rgba(255,167,38,0.12)",
                      color: p.isPublished ? "var(--green)" : "var(--orange)",
                      border: `1px solid ${p.isPublished ? "rgba(0,229,160,0.3)" : "rgba(255,167,38,0.3)"}`,
                    }}
                  >
                    {p.isPublished ? "上架中" : "已下架"}
                  </span>
                </td>
                <td style={{ padding: "14px 12px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-edit">編輯</button>
                    <button className="btn-delete">
                      {p.isPublished ? "下架" : "上架"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminProductPage;
