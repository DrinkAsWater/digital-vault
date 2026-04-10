// components/review/ReviewSection.jsx
import { useState } from "react";
import { useProductReviews, useReviewActions } from "../../hook/useReview";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const ReviewSection = ({ productId, currentUserId, userOrderId }) => {
  const { reviews, loading, error, refetch } = useProductReviews(productId);
  const { submitting, actionError, handleCreate, handleUpdate, handleDelete } =
    useReviewActions(refetch);

  // 判斷目前使用者是否已評論過
  const myReview = reviews.find((r) => r.userId === currentUserId);
  const canReview = currentUserId && userOrderId && !myReview;
  console.log("currentUserId:", currentUserId);
  console.log("userOrderId:", userOrderId);
  console.log("myReview:", myReview);
  console.log("canReview:", canReview);

  // 計算平均評分
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  if (loading) return <div className="empty-state">載入評論中...</div>;
  if (error) return <div className="empty-state">{error}</div>;

  return (
    <div className="reviews-section">
      <div className="section-title" style={{ marginBottom: "20px" }}>
        用戶評論{" "}
        <span style={{ color: "var(--cyan)" }}>({reviews.length})</span>
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

      {/* 新增評論表單 */}
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

      {/* 評論列表 */}
      {reviews.length === 0 ? (
        <div className="empty-state" style={{ padding: "40px" }}>
          <div className="empty-icon">💬</div>
          <h3>尚無評論</h3>
          <p>購買後即可留下評論</p>
        </div>
      ) : (
        reviews.map((r) => (
          <ReviewCard
            key={r.id}
            review={r}
            currentUserId={currentUserId}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            submitting={submitting}
          />
        ))
      )}
    </div>
  );
};

export default ReviewSection;
