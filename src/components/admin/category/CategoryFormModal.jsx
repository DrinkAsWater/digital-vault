import { useState, useEffect } from "react";

const CategoryFormModal = ({ category, onSubmit, onClose, submitting }) => {
  const isEdit = !!category;
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    sortOrder: 0,
    isVisible: true,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        slug: category.slug ?? "",
        description: category.description ?? "",
        sortOrder: category.sortOrder ?? 0,
        isVisible: category.isVisible ?? true,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 自動從名稱產生 slug
  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      name,
      // 只在新增時自動產生 slug
      ...(!isEdit && {
        slug: name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }),
    }));
  };

  return (
    <div
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-form-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="admin-modal">
        <button className="modal-close" onClick={onClose} aria-label="關閉">
          ✕
        </button>
        <div className="modal-logo" aria-hidden="true">
          DIGITAL VAULT
        </div>
        <h3 id="category-form-title">{isEdit ? "編輯分類" : "新增分類"}</h3>
        <p className="modal-sub">
          {isEdit ? "修改分類資訊" : "填寫新分類資訊"}
        </p>

        <div style={{ marginTop: "20px" }}>
          <div className="form-group">
            <label htmlFor="name">分類名稱 *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleNameChange}
              aria-required="true"
              placeholder="例：音樂、軟體、電子書"
            />
          </div>

          <div className="form-group">
            <label htmlFor="slug">Slug *</label>
            <input
              id="slug"
              name="slug"
              type="text"
              value={form.slug}
              onChange={handleChange}
              aria-required="true"
              placeholder="例：music, software, ebook"
            />
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                marginTop: "4px",
              }}
            >
              用於 URL，只能包含英文、數字和連字號
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">描述</label>
            <textarea
              id="description"
              name="description"
              className="admin-form-textarea"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="選填"
            />
          </div>

          <div className="admin-form-grid">
            <div className="form-group">
              <label htmlFor="sortOrder">排序</label>
              <input
                id="sortOrder"
                name="sortOrder"
                type="number"
                min="0"
                value={form.sortOrder}
                onChange={handleChange}
              />
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "24px",
              }}
            >
              <label className="admin-form-checkbox">
                <input
                  name="isVisible"
                  type="checkbox"
                  checked={form.isVisible}
                  onChange={handleChange}
                />
                顯示此分類
              </label>
            </div>
          </div>
        </div>

        <div className="admin-form-actions">
          <button
            className="btn-submit"
            onClick={() => onSubmit(form)}
            disabled={submitting || !form.name.trim() || !form.slug.trim()}
            aria-busy={submitting}
          >
            {submitting ? "處理中..." : isEdit ? "儲存變更" : "新增分類"}
          </button>
          <button className="btn-cancel" onClick={onClose}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFormModal;
