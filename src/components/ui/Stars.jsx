import { useState } from "react";

// components/ui/Stars.jsx
export function Stars({ rating, size = "0.75rem", onRatingChange }) {
  const full = Math.round(rating);
  const [hovered, setHovered] = useState(null);

  // 沒有傳 onRatingChange 就是純顯示模式（ReviewCard 用）
  const isInteractive = !!onRatingChange;
  const displayRating = hovered ?? full;

  if (!isInteractive) {
    return (
      <span className="stars" style={{ fontSize: size }}>
        {"★".repeat(full)}{"☆".repeat(5 - full)}
      </span>
    );
  }

  return (
    <span className="stars" style={{ fontSize: size, cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          style={{ color: s <= displayRating ? "var(--cyan)" : "var(--muted)" }}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onRatingChange(s)}
        >
          {s <= displayRating ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}