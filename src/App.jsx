import AppRoutes from "./routes/AppRouter";
import Header from "./shared/components/Header/Header";

function App() {
  return (
    <>
      <Header></Header>
      <AppRoutes />
    </>
  );
}

export default App;
