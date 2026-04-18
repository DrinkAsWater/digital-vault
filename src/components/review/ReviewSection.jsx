import { useOptimistic } from "react";
import { useProductReviews, useReviewActions } from "../../hook/useReview";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const ReviewSection = ({ productId, currentUserId, userOrderId }) => {
  const { reviews, loading, error, refetch } = useProductReviews(productId);
  const { submitting, actionError, handleCreate, handleUpdate, handleDelete } =
    useReviewActions(refetch);

  // 樂觀更新：立即反映刪除 / 編輯
  const [optimisticReviews, applyOptimistic] = useOptimistic(
    reviews,
    (state, action) => {
      if (action.type === "delete") {
        return state.filter((r) => r.id !== action.id);
      }
      if (action.type === "update") {
        return state.map((r) =>
          r.id === action.id
            ? { ...r, rating: action.rating, comment: action.comment }
            : r,
        );
      }
      return state;
    },
  );

  const myReview = optimisticReviews.find((r) => r.userId === currentUserId);
  const canReview = currentUserId && userOrderId && !myReview;

  const avgRating =
    optimisticReviews.length > 0
      ? (
          optimisticReviews.reduce((sum, r) => sum + r.rating, 0) /
          optimisticReviews.length
        ).toFixed(1)
      : null;

  // 樂觀刪除
  const onDelete = async (id) => {
    applyOptimistic({ type: "delete", id });
    await handleDelete(id);
  };

  // 樂觀編輯
  const onUpdate = async (id, rating, comment) => {
    applyOptimistic({ type: "update", id, rating, comment });
    return await handleUpdate(id, rating, comment);
  };

  if (loading) return <div className="empty-state">載入評論中...</div>;
  if (error) return <div className="empty-state">{error}</div>;

  return (
    <div className="reviews-section">
      <div className="section-title" style={{ marginBottom: "20px" }}>
        用戶評論{" "}
        <span style={{ color: "var(--cyan)" }}>
          ({optimisticReviews.length})
        </span>
        {avgRating && (
          <span
            style={{
              fontSize: "0.9rem",
              marginLeft: "12px",
              color: "var(--muted)",
            }}
          >
            平均 ⭐ {avgRating}
          </span>
        )}
      </div>

      {canReview && (
        <div className="review-form-wrapper">
          <div className="review-form-title">撰寫評論</div>
          {actionError && <div className="review-error">{actionError}</div>}
          <ReviewForm
            productId={productId}
            orderId={userOrderId}
            onSubmit={({ rating, comment }) =>
              handleCreate(productId, userOrderId, rating, comment)
            }
            submitting={submitting}
          />
        </div>
      )}

      {optimisticReviews.length === 0 ? (
        <div className="empty-state" style={{ padding: "40px" }}>
          <div className="empty-icon">💬</div>
          <h3>尚無評論</h3>
          <p>購買後即可留下評論</p>
        </div>
      ) : (
        optimisticReviews.map((r) => (
          <ReviewCard
            key={r.id}
            review={r}
            currentUserId={currentUserId}
            onUpdate={onUpdate}
            onDelete={onDelete}
            submitting={submitting}
          />
        ))
      )}
    </div>
  );
};

export default ReviewSection;
