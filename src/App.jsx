import AppRoutes from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto bg-white min-h-screen">
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
        />
      </div>
    </>
  );
}

export default App;
