//icon
import { AiOutlineLike, AiOutlineProduct } from "react-icons/ai";
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
import { IoMdResize } from "react-icons/io";
import { FiLayers } from "react-icons/fi";

import { BiCategory } from "react-icons/bi";

import Cash from "../../assets/paymentMethod/cash.png";
import ZaloPay from "../../assets/paymentMethod/zalopay.png";
import Momo from "../../assets/paymentMethod/momo.png";
import Visa from "../../assets/paymentMethod/visa.png";
import Vnpay from "../../assets/paymentMethod/vnpay.png";
import ApplePay from "../../assets/paymentMethod/applepay.png";
import GooglePay from "../../assets/paymentMethod/googlepay.png";
import Stripe from "../../assets/paymentMethod/stripe.png";
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
  { label: "Size", path: "/admin/size", icon: IoMdResize },
  { label: "Crust", path: "/admin/crust", icon: FiLayers },
  {
    label: "Product Variant",
    path: "/admin/product-variant",
    icon: AiOutlineProduct,
  },
  { label: "Đơn hàng", path: "/admin/orders", icon: IoReceiptOutline },
  { label: "Khách hàng", path: "/admin/customers", icon: IoPeopleOutline },
  { label: "Cài đặt", path: "/admin/settings", icon: IoSettingsOutline },
];

export const BASE_URL = "https://localhost:5000";

export const CART_STORAGE_KEY = "LearnReactjs";

export const PAYMENT_METHODS = [
  {
    id: "stripe",
    name: "Stripe",
    image: Stripe,
  },
  {
    id: "cash",
    name: "Tiền mặt",
    image: Cash,
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    image: ZaloPay,
  },
  {
    id: "momo",
    name: "Momo",
    image: Momo,
  },
  {
    id: "visa",
    name: "ATM/VISA",
    image: Visa,
  },
  {
    id: "vnpay",
    name: "VNPAY",
    image: Vnpay,
  },
  {
    id: "applepay",
    name: "Apple Pay",
    image: ApplePay,
  },
  {
    id: "googlepay",
    name: "Google Pay",
    image: GooglePay,
  },
];
