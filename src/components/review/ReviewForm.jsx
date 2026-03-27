// components/review/ReviewForm.jsx
import { useState } from "react";
import { Stars } from "../ui/Stars";

const ReviewForm = ({ orderId, productId, existing, onSubmit, onCancel, submitting }) => {
    const [rating, setRating] = useState(existing?.rating ?? 5);
    const [comment, setComment] = useState(existing?.comment ?? "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ productId, orderId, rating, comment });
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-form-rating">
                <span>評分：</span>
                {[1, 2, 3, 4, 5].map((s) => (
                    <button
                        key={s}
                        type="button"
                        className={`star-btn ${s <= rating ? "active" : ""}`}
                        onClick={() => setRating(s)}
                    >
                        ★
                    </button>
                ))}
            </div>
            <textarea
                className="review-form-textarea"
                placeholder="分享你的使用心得..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
            />
            <div className="review-form-actions">
                {onCancel && (
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        取消
                    </button>
                )}
                <button type="submit" className="btn-submit" disabled={submitting}>
                    {submitting ? "送出中..." : existing ? "更新評論" : "送出評論"}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;