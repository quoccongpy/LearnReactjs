import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeItem,
} from "../../../core/store/slice/cartSlice";
import {
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoCartOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import ".//..//..//..//shared/styles/cart.css";
import { BASE_URL } from "..//..//..//shared//utils//constants";

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();
  if (items.length === 0) {
    return (
      <div className="cart-page__header">
        <div className="cart-empty">
          <IoCartOutline className="cart-empty__icon" />
          <h2 className="cart-empty__title">Giỏ hàng trống!</h2>
          <p className="cart-empty__desc">
            Hãy thêm sản phẩm yêu thích vào giỏ hàng
          </p>
          <Link to="/" className="cart-empty__btn">
            Khám phá menu
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1>Giỏ hàng của bạn ({count} sản phẩm)</h1>
        <button
          className="cart-header__clear"
          onClick={() => dispatch(clearCart())}
        >
          Xóa tất cả
        </button>
      </div>
      <div className="cart-body">
        <div className="cart-items">
          {items.map((item) => {
            const imageUrl = item.thumbnail
              ? `${BASE_URL}${item.thumbnail}`
              : null;
            return (
              <div key={item.cartItemKey} className="cart-item">
                <div className="cart-item__image-wrapper">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.productName}
                      className="cart-item__image"
                    />
                  ) : (
                    <div className="cart-item__no-image">No image</div>
                  )}
                </div>

                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.productName}</h3>
                  Cỡ: {item.sizeName}
                  <br></br>
                  Đế: {item.crustName}({item.sizeName})<br></br>
                  Ghi chú: {item.note}
                  <p className="cart-item__price">
                    {item.price?.toLocaleString("vi-VN")} đ
                  </p>
                </div>

                <div className="cart-item__actions">
                  <div className="cart-item__quantity">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            cartItemKey: item.cartItemKey,
                            quantity: item.quantity - 1,
                          }),
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <IoRemoveOutline />
                    </button>
                    <p className="cart-item__soluong">{item.quantity}</p>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            cartItemKey: item.cartItemKey,
                            quantity: item.quantity + 1,
                          }),
                        )
                      }
                    >
                      <IoAddOutline />
                    </button>
                  </div>

                  <p className="cart-item__subtotal">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                  </p>
                  <button
                    className="cart-item__remove"
                    onClick={() => dispatch(removeItem(item.cartItemKey))}
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <div className="cart-summary__row">
            <span>Tạm tính</span>
            <span className="cart-summary__total">
              {total.toLocaleString("vi-VN")} đ
            </span>
          </div>
          <button className="cart-summary__checkout">
            Thanh toán • {total.toLocaleString("vi-VN")} đ
          </button>
        </div>
      </div>
    </div>
  );
}
