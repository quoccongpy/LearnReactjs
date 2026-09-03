import { FaStar, FaRegStar } from "react-icons/fa";
export default function StarRatingSection({
  value,
  onChange,
  readonly = false,
  size = 20,
}) {
  return (
    <div className="review-stars" style={{ "--star-size": `${size}px` }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`review-star-btn ${star <= value ? "active" : ""}`}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          aria-label={`${star} star`}
        >
          {star <= value ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
}
