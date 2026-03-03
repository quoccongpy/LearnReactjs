import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import { MENU_ITEMS } from "../../utils/constants";
import reactLogo from "../../../assets/react.svg";
import pizzaHutLogo from "../../../assets/logo.svg";

import {
  IoNotificationsOutline,
  IoCartOutline,
  IoMenuOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

function Header() {
  const [cartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white">
        <div className="hidden md:block">
          <div className="px-4">
            <div className="flex items-center justify-between h-12">
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
                <img
                  src={pizzaHutLogo}
                  alt="Pizza Hut"
                  className="h-10 w-auto"
                />
              </Link>

              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <IoNotificationsOutline className="w-5 h-5 text-gray-700" />
                </button>
                <button className="text-sm font-semibold text-[#E31837]">
                  VI
                </button>
                <Link
                  to="/cart"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoCartOutline className="w-5 h-5 text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-white text-gray-700 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center border border-gray-300">
                    {cartCount}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="px-4">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoMenuOutline className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex flex-col items-center gap-1 px-2"
                >
                  <IoSearchOutline className="w-5 h-5 text-gray-700" />
                  <span className="text-xs text-gray-700">Tìm kiếm</span>
                </button>
              </div>

              <Link to="/" className="flex items-center">
                <img
                  src={pizzaHutLogo}
                  alt="Pizza Hut"
                  className="h-8 w-auto"
                />
              </Link>

              <div className="flex items-center gap-2">
                <button className="text-sm font-semibold text-[#E31837]">
                  VI
                </button>
                <Link
                  to="/cart"
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoCartOutline className="w-5 h-5 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-gray-700 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center border border-gray-300">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="md:hidden">
            <div className="px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E31837]"
                />
                <IoSearchOutline className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block px-4 py-4">
        <div className="bg-linear-to-r from-red-600 to-red-500 rounded-xl overflow-hidden relative h-64 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">TÔM HOÀNG KIM</h2>
            <p className="text-xl">BÁNH MỚI - MÙA LỄ</p>
            <p className="text-3xl font-bold mt-2">Chỉ từ 249.000đ</p>
          </div>

          <button className="absolute left-4 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <IoChevronBack className="w-6 h-6 text-white" />
          </button>
          <button className="absolute right-4 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
            <IoChevronForward className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      <div className="sticky top-14 md:top-12 z-40 bg-white">
        <div className="px-4">
          <div className="relative flex items-center">

            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="hidden md:flex absolute left-0 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer -translate-x-1/2"
                aria-label="Cuộn sang trái"
              >
                <IoChevronBack className="w-5 h-5 text-gray-500" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="overflow-x-auto scrollbar-hide flex-1"
            >
              <nav className="flex items-center gap-4 md:gap-6 lg:gap-8 py-4 min-w-max">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="hidden lg:flex flex-col items-center gap-2 px-2 md:px-3 text-gray-700 hover:text-[#E31837] transition-colors group min-w-[70px]"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                    <IoSearchOutline className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase whitespace-nowrap">
                    Tìm kiếm
                  </span>
                </button>

                {MENU_ITEMS.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={index}
                      to={item.path}
                      className={`relative flex flex-col items-center gap-2 px-2 md:px-3 transition-colors group min-w-[70px] ${
                        isActive
                          ? "text-[#E31837]"
                          : "text-gray-700 hover:text-[#E31837]"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isActive
                            ? "bg-red-50"
                            : "bg-gray-100 group-hover:bg-red-50"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase whitespace-nowrap text-center">
                        {item.label}
                      </span>

                      {isActive && (
                        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-[#E31837] rounded-t-sm"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="hidden md:flex absolute right-0 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer translate-x-1/2"
                aria-label="Cuộn sang phải"
              >
                <IoChevronForward className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-80 h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoCloseOutline className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4">
              {MENU_ITEMS.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-700" />
                    </div>
                    <span className="text-sm font-semibold uppercase">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
