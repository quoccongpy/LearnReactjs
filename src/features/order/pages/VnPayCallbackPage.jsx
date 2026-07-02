import { useNavigate } from "react-router-dom";
import useVnPayCallback from "../hooks/useVnPayCallback";

export default function VnPayCallbackPage() {
  const navigate = useNavigate();
  const { loading, paymentResult } = useVnPayCallback();

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ maxWidth: "600px" }}>
        <div className="card shadow border-0 rounded-4 p-5">
          <div
            className="spinner-border text-primary mx-auto mb-4"
            style={{ width: "3rem", height: "3rem" }}
          ></div>

          <h3>Đang xác thực giao dịch...</h3>

          <p className="text-muted mb-0">Vui lòng không đóng trình duyệt.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <div className="card shadow border-0 rounded-4 p-5 text-center">
        {paymentResult?.success ? (
          <>
            <div className="display-1 text-success mb-3">✅</div>

            <h2 className="fw-bold text-success">Thanh toán thành công</h2>

            <p className="text-muted mb-4">{paymentResult.message}</p>

            <div className="text-start border rounded p-3 bg-light">
              <p>
                <strong>Mã đơn hàng:</strong> {paymentResult.orderId}
              </p>

              <p>
                <strong>Mã giao dịch:</strong> {paymentResult.transactionId}
              </p>

              <p>
                <strong>Phương thức:</strong> {paymentResult.paymentMethod}
              </p>
              <p>
                <strong>Số tiền:</strong>
                {paymentResult.amount.toLocaleString("vi-VN")} ₫
              </p>
              <p>
                <strong>Mô tả:</strong> {paymentResult.orderDescription}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="display-1 text-danger mb-3">❌</div>

            <h2 className="fw-bold text-danger">Thanh toán thất bại</h2>

            <p className="text-muted mb-4">{paymentResult?.message}</p>

            {paymentResult?.orderId && (
              <p>
                <strong>Mã đơn hàng:</strong> {paymentResult.orderId}
              </p>
            )}

            <button
              className="btn btn-danger mt-3"
              onClick={() => navigate("/", { replace: true })}
            >
              Quay về trang chủ
            </button>
          </>
        )}
      </div>
    </div>
  );
}
