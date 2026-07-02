import { useNavigate } from "react-router-dom";
import "../../../shared/styles/checkout.css";
import { IoChevronForward } from "react-icons/io5";
export default function OrderSummarySection({ total, count }) {
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
        <button type="submit" className="place-order-btn">
          Đặt hàng
        </button>
      </div>
    </>
  );
}
