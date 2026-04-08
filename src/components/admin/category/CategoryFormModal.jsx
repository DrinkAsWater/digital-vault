import { useState, useEffect } from "react";

const CategoryFormModal = ({ category, onSubmit, onClose, submitting }) => {
  const isEdit = !!category;
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description ?? "",
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
              onChange={handleChange}
              aria-required="true"
              placeholder="例：音樂、軟體、電子書"
            />
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
        </div>

        <div className="admin-form-actions">
          <button
            className="btn-submit"
            onClick={() => onSubmit(form)}
            disabled={submitting || !form.name.trim()}
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
