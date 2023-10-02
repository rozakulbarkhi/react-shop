import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const itemExists = state.cart.find((item) => item.id === product.id);

      if (itemExists) {
        state.cart = state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        state.cart.push({
          ...product,
          quantity: action.payload.quantity,
        });
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.totalPrice = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    totalPrice: (state) => {
      state.totalPrice = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addToCart, removeCart, totalPrice } = cartSlice.actions;
export default cartSlice.reducer;
