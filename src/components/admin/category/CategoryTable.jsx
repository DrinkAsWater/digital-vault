const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>分類</th>
          <th style={{ textAlign: "right" }}>商品數</th>
          <th style={{ textAlign: "right" }}>排序</th>
          <th style={{ textAlign: "center" }}>狀態</th>
          <th style={{ textAlign: "center" }}>操作</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c.id}>
            <td>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--text)",
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted)",
                  marginTop: "3px",
                }}
              >
                /{c.slug}
              </div>
            </td>
            <td style={{ textAlign: "right" }}>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "var(--cyan)",
                }}
              >
                {c.productCount ?? 0}
              </span>
            </td>
            <td style={{ textAlign: "right" }}>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                }}
              >
                {c.sortOrder}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>
              <span
                className={`badge ${c.isVisible ? "badge-active" : "badge-inactive"}`}
              >
                {c.isVisible ? "顯示" : "隱藏"}
              </span>
            </td>
            <td style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                <button className="btn-edit" onClick={() => onEdit(c)}>
                  編輯
                </button>
                <button className="btn-delete" onClick={() => onDelete(c.id)}>
                  刪除
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoryTable;
