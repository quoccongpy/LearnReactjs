import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reactLogo from "../../../assets/react.svg";
import { validateRegister } from "../../../shared/utils/validate";
import authService from "../services/authService";
import toastService from "../../../shared/utils/toastService";

function RegisterPage() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[e.target.name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateRegister(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      setLoading(true);
      await authService.register({
        phoneNumber: formData.phone,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      toastService.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      toastService.error(error.response?.data?.message || "Đăng ký thất bại!");
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Đăng ký</h1>
            <p className="text-gray-500 mb-8">Tạo tài khoản mới</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#E31837]"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    errors.username
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#E31837]"
                  }`}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#E31837]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#E31837]"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-[#E31837]"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#E31837] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Đăng ký
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-[#E31837] font-semibold hover:underline"
              >
                Đăng nhập
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

export default RegisterPage;
