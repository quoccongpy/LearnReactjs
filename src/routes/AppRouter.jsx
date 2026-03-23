import { Route, Routes } from "react-router-dom";
import Home from "../layouts/Home";
import Login from "../features/auth/pages/LoginPage";
import Register from "../features/auth/pages/RegisterPage";
import { ROUTES } from "../shared/utils/constants";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import DashboardOverview from "../features/dashboard/pages/DashboardOverview";
import CategoryPage from "../features/admin/category/pages/CategoryPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      <Route path={ROUTES.REGISTER} element={<Register />}></Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={"Admin"}>
            <AdminLayout></AdminLayout>
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />}></Route>
        <Route path="category" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
