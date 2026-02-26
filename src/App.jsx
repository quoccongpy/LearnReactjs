import AppRoutes from "./routes/AppRouter";
import Footer from "./shared/components/Footer/Footer";
import Header from "./shared/components/Header/Header";

function App() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto bg-white min-h-screen">
        <Header />
        <main className="flex-grow">
          <div className="h-[1000px] px-4">Nội dung giả để test cuộn trang</div>
        </main>
        <AppRoutes />
        <Footer />
      </div>
    </>
  );
}

export default App;
