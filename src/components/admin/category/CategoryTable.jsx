const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>分類名稱</th>
          <th>描述</th>
          <th>商品數量</th>
          <th>建立時間</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c.id}>
            <td style={{ fontWeight: 600, color: "var(--text)" }}>{c.name}</td>
            <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
              {c.description || "—"}
            </td>
            <td style={{ color: "var(--cyan)", fontWeight: 700 }}>
              {c.productCount ?? 0}
            </td>
            <td style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
              {new Date(c.createdAt).toLocaleDateString("zh-TW")}
            </td>
            <td>
              <div className="admin-table-actions">
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
