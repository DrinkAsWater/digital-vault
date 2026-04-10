import { Stars } from "../../ui/Stars";

const ReviewTable = ({ reviews, onDelete }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>用戶</th>
          <th>商品</th>
          <th>評分</th>
          <th>評論內容</th>
          <th>建立時間</th>
          <th style={{ textAlign: "center" }}>操作</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>
              <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>
                {review.userDisplayName}
              </div>
            </td>
            <td>
              <div style={{ fontSize: "0.85rem", color: "var(--text)" }}>
                {review.productName}
              </div>
            </td>
            <td>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <Stars rating={review.rating} />
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                  {review.rating}
                </span>
              </div>
            </td>
            <td>
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  maxWidth: "300px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {review.comment ?? "—"}
              </div>
            </td>
            <td style={{ color: "var(--muted)", fontSize: "0.78rem" }}>
              {new Date(review.createdAt).toLocaleDateString("zh-TW")}
            </td>
            <td style={{ textAlign: "center" }}>
              <button
                className="btn-delete"
                onClick={() => onDelete(review.id)}
              >
                刪除
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReviewTable;
