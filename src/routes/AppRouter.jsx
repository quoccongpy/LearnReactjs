import { Route, Routes } from "react-router-dom";
import Home from "../layouts/Home";
import Login from "../features/auth/pages/LoginPage";
import Register from "../features/auth/pages/RegisterPage";
import { ROUTES } from "../shared/utils/constants";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />}></Route>
      <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      <Route path={ROUTES.REGISTER} element={<Register />}></Route>
    </Routes>
  );
};

export default AppRoutes;
