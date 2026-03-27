import { useState, useRef } from "react";
import { Stars } from "../ui/Stars";
import { createReview } from "../../utils/ApiFuction";

const OrderReviewModal = ({ order, onClose, onSuccess }) => {
  const particleRefs = useRef({});

  const [ratings, setRatings] = useState(
    Object.fromEntries(order.items.map((item) => [item.productId, 5]))
  );
  const [comments, setComments] = useState(
    Object.fromEntries(order.items.map((item) => [item.productId, ""]))
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [reviewed, setReviewed] = useState(
    Object.fromEntries(order.items.map((item) => [item.productId, false]))
  );

  // ⭐ 判斷是否全部評論完成
  const allReviewed = Object.values(reviewed).every((v) => v === true);

  const handleSubmitOne = async (productId) => {
    setSubmitting(true);
    setError(null);
    try {
      await createReview(
        productId,
        order.id,
        ratings[productId],
        comments[productId]
      );

      setReviewed((prev) => ({
        ...prev,
        [productId]: true,
      }));

      const allDone = order.items.every(
        (item) => item.productId === productId || reviewed[item.productId]
      );

      if (allDone) {
        onSuccess?.();
      }
    } catch (err) {
      setError(err.response?.data?.message ?? "評論失敗，請稍後再試");
    } finally {
      setSubmitting(false);
    }
  };

  // ⭐ 粒子效果
  const spawnParticles = (productId) => {
    const container = particleRefs.current[productId];
    if (!container) return;

    const wrap = container.querySelector(".particles");
    if (!wrap || wrap.childElementCount > 20) return;

    for (let i = 0; i < 6; i++) {
      const p = document.createElement("span");

      p.style.left = Math.random() * 100 + "%";
      p.style.bottom = "0px";
      p.style.background = getColor();

      wrap.appendChild(p);
      setTimeout(() => p.remove(), 5000);
    }
  };

  const getColor = () => {
    const colors = ["#00e5ff", "#ff4d6d", "#ffb300", "#7c4dff"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>評論訂單 {order.orderNo}</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="review-error-animated">{error}</div>}

        {/* ⭐ 全部完成狀態 */}
        {allReviewed ? (
          <div className="review-success-state">
            <div className="success-glow"></div>

            <div className="success-check"></div>

            <h3 className="success-title">此訂單所有商品皆已評論</h3>
            <p className="success-sub">你的回饋已成功提交</p>

            <button className="btn-submit success-btn" onClick={onClose}>
              完成
            </button>
          </div>
        ) : (
          <div className="modal-body">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className={`review-item-block ${
                  reviewed[item.productId] ? "reviewed" : ""
                }`}
              >
                <div className="review-item-name">
                  {reviewed[item.productId] && (
                    <span className="reviewed-badge">
                      已評論
                      <span className="badge-dot"></span>
                    </span>
                  )}
                  {item.productName}
                </div>

                {!reviewed[item.productId] && (
                  <>
                    <div className="review-form-rating">
                      <span>評分：</span>
                      <Stars
                        rating={ratings[item.productId]}
                        onRatingChange={(val) =>
                          setRatings((prev) => ({
                            ...prev,
                            [item.productId]: val,
                          }))
                        }
                      />
                    </div>

                    {/* ⭐ 高級 textarea */}
                    <div
                      className="review-input-advanced"
                      ref={(el) =>
                        (particleRefs.current[item.productId] = el)
                      }
                    >
                      <textarea
                        className="review-form-textarea"
                        onFocus={() => spawnParticles(item.productId)}
                        placeholder="分享你的使用心得..."
                        value={comments[item.productId]}
                        onChange={(e) =>
                          setComments((prev) => ({
                            ...prev,
                            [item.productId]: e.target.value,
                          }))
                        }
                        rows={3}
                        disabled={submitting}
                      />
                      <div className="glow-border"></div>
                      <div className="particles"></div>
                    </div>

                    <button
                      className="btn-submit"
                      onClick={() => handleSubmitOne(item.productId)}
                      disabled={submitting}
                    >
                      {submitting ? "送出中..." : "送出評論"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderReviewModal;