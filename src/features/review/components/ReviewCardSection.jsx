import { IoTrashOutline, IoPencilOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import StarRatingSection from "./StarRatingSection";
export default function ReviewCardSection({
  review,
  currentUserId,
  onEdit,
  onDelete,
}) {
  const isOwner = review.userId === currentUserId;
  const date = new Date(review.createdAt).toLocaleDateString("vi-VN");
  return (
    <div
      className={`review-card ${review.isHidden ? "review-card--hidden" : ""}`}
    >
      <div className="review-card__header">
        <div className="review-card__avatar">
          <FaUserCircle />
        </div>
        <div className="review-card__meta">
          <span className="review-card__username">{review.userName}</span>
          <span className="review-card__date">{date}</span>
        </div>
        {isOwner && (
          <div className="review-card__actions">
            <button
              className="review-card__action-btn"
              onClick={() => onEdit(review)}
              title="Sửa"
            >
              <IoPencilOutline />
            </button>
            <button
              className="review-card__action-btn review-card__action-btn--danger"
              onClick={() => onDelete(review.id)}
              title="Xóa"
            >
              <IoTrashOutline />
            </button>
          </div>
        )}
      </div>
      <StarRatingSection value={review.rating} readonly size={14} />
      <p className="review-card__comment">{review.comment}</p>
      {review.isHidden && (
        <span className="review-card__hidden-badge">
          Chỉ bạn thấy (đã bị ẩn)
        </span>
      )}
    </div>
  );
}
