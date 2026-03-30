import { useState } from "react";
import { Stars } from "../ui/Stars";
import ReviewForm from "./ReviewForm";

const ReviewCard = ({
  review,
  currentUserId,
  onUpdate,
  onDelete,
  submitting,
}) => {
  const [editing, setEditing] = useState(false);
  const isOwner = currentUserId && review.userId === currentUserId;

  console.log("currentUserId:", currentUserId);
  console.log("review.userId:", review.userId);
  console.log("isOwner:", isOwner);

  // 修正：改成接收物件 { rating, comment }
  const handleUpdate = async ({ rating, comment }) => {
    const success = await onUpdate(review.id, rating, comment);
    if (success) setEditing(false);
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-avatar">
          {review.userDisplayName?.[0] ?? "?"}
        </div>
        <div>
          <div className="reviewer-name">{review.userDisplayName}</div>
          <Stars rating={review.rating} size="0.7rem" />
        </div>
        <span className="review-date">
          {new Date(review.createdAt).toLocaleDateString("zh-TW")}
        </span>
        {isOwner && !editing && (
          <div className="review-actions">
            <button className="btn-edit" onClick={() => setEditing(true)}>
              編輯
            </button>
            <button
              className="btn-delete"
              onClick={() => onDelete(review.id)}
              disabled={submitting}
            >
              刪除
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <ReviewForm
          existingReview={review}
          submitting={submitting}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="review-text">{review.comment}</div>
      )}
    </div>
  );
};

export default ReviewCard;
