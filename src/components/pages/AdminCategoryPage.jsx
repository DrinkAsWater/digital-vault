import { useState } from "react";
import PageStatus from "../ui/PageStatus";
import EmptyState from "../ui/EmptyState";
import CategoryTable from "../admin/category/CategoryTable";
import CategoryFormModal from "../admin/category/CategoryFormModal";
import { useAdminCategories } from "../../hook/useAdminCategories";

const AdminCategoryPage = () => {
  const {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useAdminCategories();
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    if (editingCategory) {
      await updateCategory(editingCategory.id, data, handleClose);
    } else {
      await createCategory(data, handleClose);
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("確定要刪除這個分類嗎？")) return;
    await deleteCategory(id);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">
            分類管理 <span>Categories</span>
          </div>
          <div className="admin-page-sub">
            管理商品分類，共 {categories.length} 個分類
          </div>
        </div>
        <button
          className="btn-primary"
          style={{ padding: "10px 24px" }}
          onClick={() => setShowForm(true)}
        >
          + 新增分類
        </button>
      </div>

      {categories.length === 0 ? (
        <EmptyState icon="⊞" title="尚無分類">
          <p style={{ marginTop: "8px" }}>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              新增第一個分類
            </button>
          </p>
        </EmptyState>
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {showForm && (
        <CategoryFormModal
          category={editingCategory}
          onSubmit={handleSubmit}
          onClose={handleClose}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default AdminCategoryPage;
