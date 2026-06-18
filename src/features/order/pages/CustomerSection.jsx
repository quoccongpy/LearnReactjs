import "../../../shared/styles/checkout.css";
export default function CustomerSection({
  fullName,
  phoneNumber,
  email,
  onChange,
}) {
  return (
    <div className="checkout-card">
      <h2>Người đặt hàng</h2>
      <p className="customer-subtitle">Thông tin được dùng liên hệ giao hàng</p>
      <div className="form-group">
        <label>Họ và tên</label>
        <input
          type="text"
          className="form-input"
          placeholder="Nhập đầy đủ họ tên của bạn"
          value={fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Số điện thoại</label>
        <input
          type="number"
          className="form-input"
          placeholder="Nhập số điện thoại của bạn"
          value={phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-input"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        ></input>
      </div>
    </div>
  );
}
