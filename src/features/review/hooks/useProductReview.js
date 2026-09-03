import { useEffect, useState } from "react";
import reviewService from "../services/reviewService";

export default function useProductReview(productId) {
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [canReview, setCanReview] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const pageSize = 5;
  const isLoggedIn = !!localStorage.getItem("auth_token");

  const loadReviews = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await reviewService.getByProduct(productId, {
        pageIndex,
        pageSize,
      });

      setReviews(res.data.results ?? []);
      setTotalCount(res.data.rowCount ?? 0);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const checkCanReview = async () => {
    if (!productId || !isLoggedIn) {
      setCanReview(false);
      return;
    }

    try {
      const res = await reviewService.canReview(productId);
      setCanReview(res.data?.canReview ?? false);
    } catch (err) {
      setCanReview(false);
      setError(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId, pageIndex]);

  useEffect(() => {
    checkCanReview();
  }, [productId]);

  const handleSubmit = async () => {
    if (!form.comment.trim()) {
      setError("Vui lòng nhập nội dung đánh giá");
      return false;
    }

    try {
      setSubmitting(true);
      setError(null);

      if (editingId) {
        await reviewService.update(editingId, {
          rating: form.rating,
          comment: form.comment,
        });

        setEditingId(null);
      } else {
        await reviewService.create({
          productId,
          rating: form.rating,
          comment: form.comment,
        });

        setCanReview(false);
      }
      setForm({
        rating: 5,
        comment: "",
      });
      await loadReviews();
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      setError(null);
      await reviewService.remove(reviewId);
      await loadReviews();
      await checkCanReview();
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const handleEdit = (review) => {
    setEditingId(review.id);

    setForm({
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      rating: 5,
      comment: "",
    });
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return {
    error,
    reviews,
    totalCount,
    pageIndex,
    setPageIndex,
    pageCount: Math.ceil(totalCount / pageSize),
    loading,
    submitting,
    canReview,
    isLoggedIn,
    editingId,
    form,
    setForm,
    averageRating,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleCancelEdit,
  };
}
