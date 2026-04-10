import PageStatus from "../ui/PageStatus";
import EmptyState from "../ui/EmptyState";
import ReviewTable from "../admin/review/ReviewTable";
import { useAdminReviews } from "../../hook/useAdminReviews";

const AdminReviewPage = () => {
  const { reviews, loading, error, deleteReview } = useAdminReviews();

  if (loading || error) return <PageStatus loading={loading} error={error} />;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">
            評論管理 <span>Reviews</span>
          </div>
          <div className="admin-page-sub">共 {reviews.length} 則評論</div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <EmptyState icon="◎" title="尚無評論" />
      ) : (
        <ReviewTable reviews={reviews} onDelete={deleteReview} />
      )}
    </div>
  );
};

export default AdminReviewPage;
