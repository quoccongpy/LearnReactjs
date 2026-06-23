import { useNavigate } from "react-router-dom";
import "../../../shared/styles/checkout.css";
import { IoChevronForward } from "react-icons/io5";
export default function OrderSummarySection({
  items,
  total,
  count,
  loading,
  agreeTerms,
  onAgreeChange,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="checkout-card">
        <div
          className="delivery-header"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
        >
          <h2>Giỏ hàng của tôi</h2>
          <IoChevronForward className="change-address-btn" />
        </div>
        <p className="summary-cart-count">
          Có {count} sản phẩm trong giỏ hàng của bạn
        </p>
        <div className="summary-rows">
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{total.toLocaleString("vi-VN")} đ</span>
          </div>
        </div>
        <div className="summary-total">
          <span>Tổng cộng</span>
          <span className="summary-total-price">
            {total.toLocaleString("vi-VN")} đ
          </span>
        </div>
      </div>

      <div className="checkout-card">
        <label className="terms-checkbox">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => onAgreeChange(e.target.checked)}
          />
          <span className="terms-text">
            Tôi đồng ý với
            <a href="#" className="terms-link">
              các điều khoản và điều kiện
            </a>
            và tham gia
            <a href="#" className="terms-link">
              chương trình thành viên Hut Rewards
            </a>
            để tích điểm và hưởng quyền lợi theo quy định của chương trình.
          </span>
        </label>
        <button
          type="submit"
          className="place-order-btn"
          disabled={loading || !agreeTerms}
        >
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </div>
    </>
  );
}
