import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reactLogo from "../../../assets/react.svg";
import toastService from "../../../shared/utils/toastService";
import LoadingOverlay from "../../../shared/components/LoadingOverlay";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({
        email: formData.email,
        password: formData.password,
      });
      const token = localStorage.getItem("auth_token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const roleClaim =
        payload.role ||
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const roles = roleClaim
        ? Array.isArray(roleClaim)
          ? roleClaim
          : [roleClaim]
        : [];

      if (roles.includes("Admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
      toastService.success("Đăng nhập thành công!");
    } catch (error) {
      toastService.error(
        error.response?.data?.message || "Đăng nhập thất bại!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="min-h-screen flex">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-red-500 to-red-700 items-center justify-center">
          <div className="text-center">
            <img
              src={reactLogo}
              alt="React"
              className="w-40 h-40 mx-auto animate-spin"
              style={{ animationDuration: "10s" }}
            />
            <h2 className="text-white text-3xl font-bold mt-6">React!</h2>
            <p className="text-white/80 mt-2">
              The library for web and native user interfaces
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Đăng Nhập</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#E31837] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Đăng nhập
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-[#E31837] font-semibold hover:underline"
              >
                Đăng kí
              </Link>
            </p>

            <p className="text-center text-sm text-gray-500 mt-6">
              <Link
                to="/"
                className="text-[#E31837] font-semibold hover:underline"
              >
                Quay lại
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
