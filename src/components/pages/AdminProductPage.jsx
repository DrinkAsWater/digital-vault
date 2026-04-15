import { useState, useMemo } from "react";
import PageStatus from "../ui/PageStatus";
import EmptyState from "../ui/EmptyState";
import ProductTable from "../../components/admin/product/ProductTable";
import ProductFormModal from "../../components/admin/product/ProductFormModal";
import { useAdminProducts } from "../../hook/useAdminProducts";

const AdminProductPage = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    unpublishProduct,
    publishProduct,
  } = useAdminProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // 前端篩選
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchKeyword =
        !keyword ||
        p.name.toLowerCase().includes(keyword.toLowerCase()) ||
        p.categoryName?.toLowerCase().includes(keyword.toLowerCase());
      const matchStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "published"
            ? p.isPublished
            : !p.isPublished;
      return matchKeyword && matchStatus;
    });
  }, [products, keyword, filterStatus]);

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    if (editingProduct) {
      await updateProduct(editingProduct.id, data, handleClose);
    } else {
      await createProduct(data, handleClose);
    }
    setSubmitting(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="admin-page-title">
          商品管理 <span>Products</span>
        </div>
        <button
          className="btn-primary"
          style={{ padding: "10px 24px" }}
          onClick={() => setShowForm(true)}
        >
          + 新增商品
        </button>
      </div>

      {/* 搜尋 + 篩選列 */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <input
            type="text"
            placeholder="搜尋商品名稱或分類..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: "100%",
              padding: "9px 14px 9px 36px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "9px",
              color: "var(--text)",
              fontSize: "0.88rem",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--muted)",
              fontSize: "0.85rem",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "9px 14px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "9px",
            color: "var(--text)",
            fontSize: "0.88rem",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="all">全部狀態</option>
          <option value="published">上架中</option>
          <option value="unpublished">已下架</option>
        </select>
        <div
          style={{
            fontSize: "0.82rem",
            color: "var(--muted)",
            alignSelf: "center",
          }}
        >
          共 {filteredProducts.length} 筆
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState icon="📦" title={keyword ? "找不到符合的商品" : "尚無商品"}>
          {!keyword && (
            <p style={{ marginTop: "8px" }}>
              <button className="btn-primary" onClick={() => setShowForm(true)}>
                新增第一個商品
              </button>
            </p>
          )}
        </EmptyState>
      ) : (
        <ProductTable
          products={filteredProducts}
          onEdit={handleEdit}
          onUnpublish={unpublishProduct}
          onPublish={publishProduct}
        />
      )}

      {showForm && (
        <ProductFormModal
          product={editingProduct}
          onSubmit={handleSubmit}
          onClose={handleClose}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default AdminProductPage;
