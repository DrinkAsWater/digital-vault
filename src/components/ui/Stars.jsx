export function Stars({ rating, size = "0.75rem" }) {
  const full = Math.round(rating);
  return (
    <span className="stars" style={{ fontSize: size }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  );
}