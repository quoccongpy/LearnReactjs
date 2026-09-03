import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import reviewService from "../../../review/services/reviewService";
import toastService from "../../../../shared/utils/toastService";
import { IoTrashOutline, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function ReviewPage() {
  const [keyword, setKeyword] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await reviewService.getAllForAdmin({
        pageIndex,
        pageSize: 10,
        keyword,
      });
      setReviews(res.data.results || []);
      setPageCount(Math.ceil((res.data.rowCount || 0) / 10));
    } catch {
      toastService.error("Không thể tải danh sách đánh giá");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [pageIndex]);
  const handleHide = async (id, currentHidden) => {
    try {
      await reviewService.hide(id, !currentHidden);
      toastService.success(
        !currentHidden ? "Đã ẩn đánh giá" : "Đã hiện đánh giá",
      );
      fetchReviews();
    } catch {
      toastService.error("Thao tác thất bại");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa đánh giá này?")) return;
    try {
      await reviewService.remove(id);
      toastService.success("Đã xóa đánh giá");
      fetchReviews();
    } catch {
      toastService.error("Xóa thất bại");
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý đánh giá</h1>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchReviews()}
          placeholder="Tìm kiếm theo nội dung..."
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={() => {
            setPageIndex(1);
            fetchReviews();
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Tìm
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Người dùng</th>
              <th className="px-4 py-3 text-left">Sản phẩm</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-left">Bình luận</th>
              <th className="px-4 py-3 text-left">Ngày</th>
              <th className="px-4 py-3 text-left">Trạng thái</th>
              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Đang tải...
                </td>
              </tr>
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  Không có đánh giá nào
                </td>
              </tr>
            ) : (
              reviews.map((r) => (
                <tr key={r.id} className={r.isHidden ? "bg-yellow-50" : ""}>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {r.userName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">#{r.productId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{r.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">
                    {r.comment}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    {r.isHidden ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Đã ẩn
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Hiển thị
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleHide(r.id, r.isHidden)}
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800"
                        title={r.isHidden ? "Hiện lại" : "Ẩn đánh giá"}
                      >
                        {r.isHidden ? (
                          <IoEyeOutline size={18} />
                        ) : (
                          <IoEyeOffOutline size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600"
                        title="Xóa"
                      >
                        <IoTrashOutline size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            disabled={pageIndex === 1}
            onClick={() => setPageIndex((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            ← Trước
          </button>
          <span className="px-3 py-1 text-sm text-gray-600">
            {pageIndex} / {pageCount}
          </span>
          <button
            disabled={pageIndex === pageCount}
            onClick={() => setPageIndex((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Sau →
          </button>
        </div>
      )}
    </>
  );
}
