import Footer from "../shared/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import OrderTrackingHeader from "..//shared//components//Header//OrderTrackingHeader";

function OrderTracking() {
  return (
    <>
      <OrderTrackingHeader></OrderTrackingHeader>
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default OrderTracking;
