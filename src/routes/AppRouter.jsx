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
import ProductPage from "../features/admin/product/pages/ProductPage";
import SizePage from "../features/admin/size/pages/SizePage";
import CrustPage from "../features/admin/crust/pages/CrustPage";
import ProductVariantPage from "../features/admin/product-variant/pages/ProductVariantPage";
import CartPage from "../features/cart/pages/CartPage";
import CartLayout from "../layouts/CartLayout";
import CheckoutPage from "../features/order/pages/CheckoutPage";
import CheckoutLayout from "../layouts/CheckoutLayout";
import StripePaymentPage from "../features/order/pages/StripePaymentPage";
import OrderConfirmationPage from "../features/order/pages/OrderConfirmationPage";
import VnPayCallbackPage from "../features/order/pages/VnPayCallbackPage";
import PayPalCallbackPage from "../features/order/pages/PayPalCallbackPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Route>
      <Route element={<CartLayout />}>
        <Route path={ROUTES.CART} element={<CartPage />} />
      </Route>
      <Route element={<CheckoutLayout />}>
        <Route
          path={ROUTES.CHECKOUT}
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmationPage />}
        />
      </Route>
      <Route path={ROUTES.LOGIN} element={<Login />}></Route>
      <Route path={ROUTES.REGISTER} element={<Register />}></Route>
      <Route
        path="/payment/stripe/:orderId"
        element={
          <ProtectedRoute>
            <StripePaymentPage></StripePaymentPage>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/vnpay-callback"
        element={
          <ProtectedRoute>
            <VnPayCallbackPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/paypal-callback"
        element={
          <ProtectedRoute>
            <PayPalCallbackPage />
          </ProtectedRoute>
        }
      />

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
        <Route path="product" element={<ProductPage />} />
        <Route path="product-variant" element={<ProductVariantPage />} />
        <Route path="size" element={<SizePage />} />
        <Route path="crust" element={<CrustPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
