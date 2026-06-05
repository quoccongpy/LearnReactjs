import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer/Footer";
import CartHeader from "../shared/components/Header/CartHeader";

function CartLayout() {
  return (
    <>
      <CartHeader></CartHeader>
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default CartLayout;
