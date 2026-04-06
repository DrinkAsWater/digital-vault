const ProductTable = ({ products, onEdit, onUnpublish }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>商品名稱</th>
          <th>分類</th>
          <th>價格</th>
          <th>狀態</th>
          <th>建立時間</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>
              <div className="product-name-cell">
                {p.thumbnailUrl && (
                  <img
                    src={p.thumbnailUrl}
                    alt={p.name}
                    className="product-thumb"
                  />
                )}
                {p.name}
              </div>
            </td>
            <td style={{ color: "var(--muted)" }}>{p.categoryName}</td>
            <td style={{ color: "var(--cyan)", fontWeight: 700 }}>
              ${p.price}
            </td>
            <td>
              <span
                className={`badge ${p.isPublished ? "badge-published" : "badge-unpublished"}`}
              >
                {p.isPublished ? "上架中" : "已下架"}
              </span>
            </td>
            <td style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
              {new Date(p.createdAt).toLocaleDateString("zh-TW")}
            </td>
            <td>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="btn-edit" onClick={() => onEdit(p)}>
                  編輯
                </button>
                {p.isPublished && (
                  <button
                    className="btn-delete"
                    onClick={() => onUnpublish(p.id)}
                  >
                    下架
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
