import pizzaHutLogo from "../../../assets/logo.svg";
import { IoArrowBack } from "react-icons/io5";
import "../../styles/CartHeader.css";
export default function CheckoutHearder() {
  return (
    <header className="cart-header">
      <div className="cart-header__top">
        <img src={pizzaHutLogo} alt="Pizza Hut" className="h-10 w-auto" />
      </div>

      <div className="cart-header__content">
        <button
          className="cart-header__back"
          onClick={() => window.history.back()}
        >
          <IoArrowBack />
          <span>Trở lại</span>
        </button>

        <h1 className="cart-header__title">Thanh Toán</h1>

        <div className="cart-header__placeholder" />
      </div>
    </header>
  );
}
