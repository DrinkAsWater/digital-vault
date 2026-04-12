import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = ({ count = 8 }) => (
  <div className="products">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonGrid;
