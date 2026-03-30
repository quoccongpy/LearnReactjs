//icon
import { AiOutlineLike } from "react-icons/ai";
import {
  FaGift,
  FaStar,
  FaBoxOpen,
  FaChild,
  FaUtensils,
  FaBox,
} from "react-icons/fa";
import { CiPizza } from "react-icons/ci";
import { GiChickenOven } from "react-icons/gi";
import { RiDrinksLine } from "react-icons/ri";
import { FaPepperHot } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";

import {
  IoHomeOutline,
  IoFastFoodOutline,
  IoReceiptOutline,
  IoPeopleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

import { BiCategory } from "react-icons/bi";
//router
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  CHECKOUT: "/checkout",
  ORDER_CONFIRMATION: "/order-confimation",
  MENU_MANAGEMENT: "/menu-management",
  ORDER_MANAGEMENT: "/order-management",
};

// category

export const MENU_ITEMS = [
  { label: "BẠN SẼ THÍCH", path: "/favorites", icon: AiOutlineLike },
  { label: "MUA 1 TẶNG 1", path: "/buy-1-get-1", icon: FaGift },
  { label: "DEAL MÙA LỄ HỘI", path: "/festival-deals", icon: FaStar },
  { label: "COMBO MÙA LỄ", path: "/festival-combo", icon: FaBoxOpen },
  { label: "KIDS MENU", path: "/kids-menu", icon: FaChild },
  { label: "PIZZA", path: "/pizza", icon: CiPizza },
  { label: "GHIỀN GÀ", path: "/chicken", icon: GiChickenOven },
  { label: "MÓN KHAI VỊ", path: "/appetizers", icon: FaUtensils },
  { label: "MY BOX", path: "/my-box", icon: FaBox },
  { label: "THỨC UỐNG", path: "/drinks", icon: RiDrinksLine },
  { label: "CAY", path: "/c", icon: FaPepperHot },
  { label: "CHAY", path: "/vegetarian", icon: LuVegan },
];

// user
export const GUEST_MENU_ITEMS = [
  { label: "Đăng nhập", path: "/login" },
  { label: "Đăng ký", path: "/register" },
];
// Khi ĐÃ đăng nhập
export const USER_MENU_ITEMS = [
  { label: "Theo dõi đơn hàng", path: "/order-tracking" },
  { label: "Đổi điểm", path: "/redeem-points" },
  { label: "Hut Rewards", path: "/hut-rewards" },
  { label: "Hỗ trợ khách hàng", path: "/support" },
];

export const SIDEBAR_ITEMS = [
  { label: "Tổng quan", path: "/admin", icon: IoHomeOutline },
  { label: "Menu", path: "/admin/product", icon: IoFastFoodOutline },
  { label: "Category", path: "/admin/category", icon: BiCategory },
  { label: "Đơn hàng", path: "/admin/orders", icon: IoReceiptOutline },
  { label: "Khách hàng", path: "/admin/customers", icon: IoPeopleOutline },
  { label: "Cài đặt", path: "/admin/settings", icon: IoSettingsOutline },
];

export const BASE_URL = "https://localhost:5000";
