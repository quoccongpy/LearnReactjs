import { Outlet } from "react-router-dom";
import Footer from "../shared/components/Footer/Footer";
import CartHeader from "../shared/components/Header/CartHeader";
import CheckoutHearder from "../shared/components/Header/CheckoutHearder";

function CheckoutLayout() {
  return (
    <>
      <CheckoutHearder></CheckoutHearder>
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default CheckoutLayout;
