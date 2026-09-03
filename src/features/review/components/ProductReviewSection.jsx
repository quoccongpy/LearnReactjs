import { decodeToken } from "../../../shared/utils/jwt";
import useProductReview from "../hooks/useProductReview";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import StarRatingSection from "./StarRatingSection";
import ReviewCardSection from "./ReviewCardSection";
import toastService from "../../../shared/utils/toastService";

export default function ProductReviewSection({ productId }) {
  const token = localStorage.getItem("auth_token");
  const currentUser = token ? decodeToken(token) : null;
  const {
    error,
    averageRating,
    totalCount,
    reviews,
    pageIndex,
    setPageIndex,
    pageCount,
    loading,
    submitting,
    canReview,
    editingId,
    form,
    setForm,
    isLoggedIn,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleCancelEdit,
  } = useProductReview(productId);

  const onSubmit = async () => {
    try {
      await handleSubmit();
      toastService.success(
        editingId ? "Đã cập nhật đánh giá" : "Cảm ơn bạn đã đánh giá!",
      );
    } catch (err) {
      const message =
        err?.response?.data?.message ??
        err?.message ??
        "Không thể gửi đánh giá. Thử lại sau.";
      toastService.error(message);
    }
  };

  const onDelete = async (reviewId) => {
    if (!window.confirm("Bạn muốn xóa đánh giá này?")) {
      return;
    }
    try {
      await handleDelete(reviewId);
      toastService.success("Đã xóa đánh giá");
    } catch (err) {
      const message = err?.response?.data?.message ?? "Không thể xóa đánh giá";
      toastService.error(message);
    }
  };

  return (
    <div className="review-section">
      <div className="review-section__header">
        <h3 className="review-section__title">Đánh giá sản phẩm</h3>
        {averageRating && (
          <div className="review-section__avg">
            <span className="review-section__avg-score">{averageRating}</span>
            <FaStar className="review-section__avg-star" />
            <span className="review-section__avg-count">
              ({totalCount} đánh giá)
            </span>
          </div>
        )}
      </div>

      {isLoggedIn && (canReview || editingId) && (
        <div className="review-form">
          <h4 className="review-form__title">
            {editingId ? "Chỉnh sửa đánh giá" : "Viết đánh giá của bạn"}
          </h4>
          <div className="review-form__rating-row">
            <span className="review-form__label">Điểm:</span>
            <StarRatingSection
              value={form.rating}
              onChange={(val) => setForm((f) => ({ ...f, rating: val }))}
              size={24}
            />
          </div>
          <textarea
            className="review-form__textarea"
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
            value={form.comment}
            onChange={(e) =>
              setForm((f) => ({ ...f, comment: e.target.value }))
            }
            maxLength={1000}
          />
          <div className="review-form__footer">
            <span className="review-form__char-count">
              {form.comment.length}/1000
            </span>
            <div className="review-form__btns">
              {editingId && (
                <button
                  className="review-form__btn review-form__btn--cancel"
                  onClick={handleCancelEdit}
                >
                  Hủy
                </button>
              )}
              <button
                className="review-form__btn review-form__btn--submit"
                onClick={onSubmit}
                disabled={submitting}
              >
                {submitting
                  ? "Đang gửi..."
                  : editingId
                    ? "Lưu thay đổi"
                    : "Gửi đánh giá"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && !canReview && !editingId && totalCount === 0 && (
        <p className="review-section__notice">
          Bạn cần mua và nhận sản phẩm này mới có thể đánh giá.
        </p>
      )}
      {!isLoggedIn && (
        <p className="review-section__notice">
          <a href="/login">Đăng nhập</a> để viết đánh giá.
        </p>
      )}
      {loading ? (
        <div className="review-section__loading">
          {[1, 2, 3].map((i) => (
            <div key={i} className="review-skeleton" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="review-section__empty">
          Chưa có đánh giá nào. Hãy là người đầu tiên!
        </p>
      ) : (
        <div className="review-section__list">
          {reviews.map((r) => (
            <ReviewCardSection
              key={r.id}
              review={r}
              currentUserId={currentUser?.id}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <div className="review-pagination">
          <button
            className="review-pagination__btn"
            disabled={pageIndex === 1}
            onClick={() => setPageIndex((p) => p - 1)}
          >
            ← Trước
          </button>
          <span className="review-pagination__info">
            {pageIndex} / {pageCount}
          </span>
          <button
            className="review-pagination__btn"
            disabled={pageIndex === pageCount}
            onClick={() => setPageIndex((p) => p + 1)}
          >
            Sau →
          </button>
        </div>
      )}
    </div>
  );
}
