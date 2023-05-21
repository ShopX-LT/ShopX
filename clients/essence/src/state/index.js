import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart item shape
 * {
 *  itemId: id,
 *  price: double,
 *  quantity: int
 * }
 **/
const initialState = {
  cart: [],
  total: 0,
  isCartOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { itemId, price, quantity } = action.payload;
      const item = state.cart.find((item) => item.itemId === itemId);
      state.total += price;
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ itemId, price, quantity });
      }
    },

    increaseItemCount: (state, action) => {
      const { id } = action.payload;
      console.log(id);
      const item = state.cart.find((item) => item.itemId === id);
      if (item) {
        state.total += item.price;
        item.quantity += 1;
      }
    },

    decreaseItemCount: (state, action) => {
      const { id } = action.payload;
      const selectedItem = state.cart.find((item) => item.itemId === id);
      if (selectedItem) {
        if (selectedItem.quantity > 1) {
          selectedItem.quantity -= 1;
          state.total -= selectedItem.price;
        } else {
          state.cart = state.cart.filter((item) => item.itemId !== id);
          state.total -= selectedItem.price;
        }
      }
    },

    setIsCartOpen: (state, action) => {
      state.isCartOpen = !state.isCartOpen;
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  decreaseItemCount,
  increaseItemCount,
  setIsCartOpen,
  clearCart,
} = userSlice.actions;

export default userSlice.reducer;
