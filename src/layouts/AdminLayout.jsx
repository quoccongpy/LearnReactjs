import { Link, Outlet, useLocation } from "react-router-dom";

import {
  IoLogOutOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearchOutline,
  IoTrendingUpOutline,
  IoCartOutline,
  IoPersonOutline,
  IoEyeOutline,
} from "react-icons/io5";
import { useState } from "react";

import { useAuth } from "../features/auth/hooks/useAuth";
import { SIDEBAR_ITEMS } from "../shared/utils/constants";

function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-30">
        <div className="px-6 py-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-[#E31837]">🍕 Admin Panel</h1>
          <p className="text-xs text-gray-400 mt-1">Quản trị hệ thống</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-red-50 text-[#E31837]"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-gray-200">
          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-gray-700 truncate">
              {user?.userName || user?.email}
            </p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <IoLogOutOutline className="w-5 h-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-200">
              <h1 className="text-xl font-bold text-[#E31837]">
                🍕 Admin Panel
              </h1>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {SIDEBAR_ITEMS.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-red-50 text-[#E31837]"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="px-3 py-4 border-t border-gray-200">
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <IoLogOutOutline className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <IoMenuOutline className="w-6 h-6 text-gray-600" />
              </button>
              <div className="relative hidden sm:block">
                <IoSearchOutline className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E31837]/20 w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <IoNotificationsOutline className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-[#E31837] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {(user?.userName || "A").charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.userName || user?.email}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
