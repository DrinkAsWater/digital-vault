import { useState, useEffect } from "react";
import { useCategories } from "../../../hook/useProduct";

const ProductFormModal = ({ product, onSubmit, onClose, submitting }) => {
  const { categories } = useCategories();
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    thumbnailUrl: "",
    downloadUrl: "",
    isPublished: true,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        categoryId: product.categoryId,
        thumbnailUrl: product.thumbnailUrl ?? "",
        downloadUrl: product.downloadUrl ?? "",
        isPublished: product.isPublished,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      price: parseFloat(form.price),
    });
  };

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-form-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="admin-modal">
        <button className="modal-close" onClick={onClose} aria-label="關閉">
          ✕
        </button>
        <div className="modal-logo" aria-hidden="true">
          DIGITAL VAULT
        </div>
        <h3 id="product-form-title">{isEdit ? "編輯商品" : "新增商品"}</h3>
        <p className="modal-sub">
          {isEdit ? "修改商品資訊" : "填寫新商品資訊"}
        </p>

        <div style={{ marginTop: "20px" }}>
          <div className="form-group">
            <label htmlFor="name">商品名稱 *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">商品描述</label>
            <textarea
              id="description"
              name="description"
              className="admin-form-textarea"
              value={form.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="admin-form-grid">
            <div className="form-group">
              <label htmlFor="price">價格 *</label>
              <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="categoryId">分類 *</label>
              <select
                id="categoryId"
                name="categoryId"
                className="admin-form-select"
                value={form.categoryId}
                onChange={handleChange}
                aria-required="true"
              >
                <option value="">選擇分類</option>
                {categories
                  .filter((c) => c.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="thumbnailUrl">縮圖 URL</label>
            <input
              id="thumbnailUrl"
              name="thumbnailUrl"
              type="url"
              value={form.thumbnailUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="downloadUrl">下載 URL</label>
            <input
              id="downloadUrl"
              name="downloadUrl"
              type="url"
              value={form.downloadUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <label className="admin-form-checkbox">
            <input
              name="isPublished"
              type="checkbox"
              checked={form.isPublished}
              onChange={handleChange}
            />
            立即上架
          </label>
        </div>

        <div className="admin-form-actions">
          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={submitting}
            aria-busy={submitting}
          >
            {submitting ? "處理中..." : isEdit ? "儲存變更" : "新增商品"}
          </button>
          <button className="btn-cancel" onClick={onClose}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
