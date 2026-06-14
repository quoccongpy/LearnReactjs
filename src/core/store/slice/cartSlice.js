import { createSlice } from "@reduxjs/toolkit";
import { CART_STORAGE_KEY } from "../../../shared/utils/constants";

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCartToStorage = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const createCartItemKey = ({ productId, variantId, sizeId, crustId, note }) => {
  return `${productId}_${variantId || "no-variant"}_${sizeId || "no-size"}_${
    crustId || "no-crust"
  }_${note || ""}`;
};

const cartSlice = createSlice({
  name: "cartReactjs",
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const key = createCartItemKey(newItem);

      const existingIndex = state.items.findIndex(
        (item) => item.cartItemKey === key,
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += newItem.quantity;
        state.items[existingIndex].note = newItem.note;
      } else {
        state.items.push({ ...newItem, cartItemKey: key });
      }
      saveCartToStorage(state.items);
    },

    removeItem: (state, action) => {
      const key = action.payload;
      state.items = state.items.filter((item) => item.cartItemKey != key);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { cartItemKey, quantity } = action.payload;
      const item = state.items.find((i) => i.cartItemKey === cartItemKey);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(CART_STORAGE_KEY);
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart } =
  cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export default cartSlice.reducer;
