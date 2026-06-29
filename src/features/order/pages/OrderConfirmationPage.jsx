import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import "../../../shared/styles/checkout.css";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectStatus = searchParams.get("redirect_status");
  const isSuccess = redirectStatus === "succeeded";

  return (
    <div className="checkout-container">
      <div className="confirmation-wrapper">
        {isSuccess ? (
          <>
            <div className="confirmation-icon success">✓</div>
            <h1>Thanh toán thành công!</h1>
            <p>Đơn hàng #{orderId} đã được xác nhận.</p>
            <p>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng sớm nhất.</p>
          </>
        ) : (
          <>
            <div className="confirmation-icon failed">✗</div>
            <h1>Thanh toán thất bại</h1>
            <p>Đơn hàng #{orderId} chưa được thanh toán.</p>
            <p>Vui lòng thử lại hoặc chọn phương thức thanh toán khác.</p>
          </>
        )}
        <button
          className="place-order-btn"
          onClick={() => navigate("/")}
          style={{ marginTop: "20px" }}
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
