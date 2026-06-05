import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  MENU_ITEMS,
  USER_MENU_ITEMS,
  GUEST_MENU_ITEMS,
} from "../../utils/constants";
import pizzaHutLogo from "../../../assets/logo.svg";
import { useSelector } from "react-redux";

import {
  IoNotificationsOutline,
  IoCartOutline,
  IoMenuOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoChevronBack,
  IoChevronForward,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { useAuth } from "../../../features/auth/hooks/useAuth";
import LocationModal from "../LocationModal";
import { selectCartCount } from "../../../core/store/slice/cartSlice";

function Header() {
  const cartCount = useSelector(selectCartCount);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { user, logout } = useAuth();
  const menuItems = user ? USER_MENU_ITEMS : GUEST_MENU_ITEMS;

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => setShowLocationModal(true)}
              >
                <span className="text-sm font-semibold text-gray-800 truncate max-w-[220px]">
                  {location?.address || "Chọn địa chỉ"}
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

                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full hover:shadow-md transition-all"
                  >
                    <IoMenuOutline className="w-4 h-4 text-gray-700" />
                    <IoPersonCircleOutline className="w-7 h-7 text-gray-600" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      {menuItems.map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          {item.label}
                        </Link>
                      ))}
                      {user && (
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-gray-50 transition-colors border-t border-gray-100"
                        >
                          Đăng xuất
                        </button>
                      )}
                    </div>
                  )}
                </div>
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

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        const sections =
                          document.querySelectorAll(".home-section");
                        for (const section of sections) {
                          const title = section.querySelector(
                            ".home-section__title",
                          );
                          if (
                            title &&
                            title.textContent
                              .trim()
                              .toLowerCase()
                              .includes(item.label.toLowerCase())
                          ) {
                            const headerOffset = 140;
                            const top =
                              section.getBoundingClientRect().top +
                              window.scrollY -
                              headerOffset;
                            window.scrollTo({ top, behavior: "smooth" });
                            break;
                          }
                        }
                      }}
                      className="relative flex flex-col items-center gap-2 px-2 md:px-3 transition-colors group min-w-[70px] text-gray-700 hover:text-[#E31837] cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-gray-100 group-hover:bg-red-50">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase whitespace-nowrap text-center">
                        {item.label}
                      </span>
                    </button>
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

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onSelect={(data) => setLocation(data)}
        />
      )}

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
