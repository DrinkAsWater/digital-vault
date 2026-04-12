import { useState } from "react";
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

      {products.length === 0 ? (
        <EmptyState icon="📦" title="尚無商品">
          <p style={{ marginTop: "8px" }}>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              新增第一個商品
            </button>
          </p>
        </EmptyState>
      ) : (
        <ProductTable
          products={products}
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
