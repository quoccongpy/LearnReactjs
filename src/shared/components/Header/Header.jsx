import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MENU_ITEMS } from "../../utils/constants";
import reactLogo from "../../../assets/react.svg"; // React logo bên trái
import pizzaHutLogo from "../../../assets/logo.svg"; // Pizza Hut logo ở giữa
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Left - React Logo */}
            <div className="flex items-center gap-2">
              <img
                src={reactLogo}
                alt="React"
                className="h-6 w-6 animate-spin"
                style={{ animationDuration: "10s" }}
              />
              <span className="text-sm font-semibold text-gray-700">
                React App
              </span>
            </div>
            <Link to="/" className="flex items-center">
              <img src={pizzaHutLogo} alt="Pizza Hut" className="h-10 w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
              <button className="text-sm font-semibold text-[#E31837]">
                VI
              </button>
              <Link
                to="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-white text-gray-700 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center border border-gray-300">
                  {cartCount}
                </span>
              </Link>

              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isScrolled && (
        <div className="bg-gradient-to-r from-red-600 to-red-500 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative h-64 flex items-center justify-center">
              {/* Banner content - Bạn có thể thay bằng image thật */}
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">TÔM HOÀNG KIM</h2>
                <p className="text-xl">BÁNH MỚI - MÙA LỄ</p>
                <p className="text-3xl font-bold mt-2">Chỉ từ 249.000đ</p>
              </div>

              <button className="absolute left-4 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="absolute right-4 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 py-4">
            {MENU_ITEMS.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className="flex flex-col items-center gap-2 text-gray-700 hover:text-[#E31837] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
export default Header;
