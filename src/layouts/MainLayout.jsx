import { Outlet } from "react-router-dom";
import Header from "../shared/components/Header/Header";
import Footer from "../shared/components/Footer/Footer";

function MainLayout() {
  return (
    <>
      <Header></Header>
      <main className="flex-grow">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
}

export default MainLayout;
