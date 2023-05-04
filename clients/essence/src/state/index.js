import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isCartOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find((item) => item.item === action.payload.item);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    increaseItemCount: (state, action) => {
      const item = state.cart.find((item) => item.item === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItemCount: (state, action) => {
      const selectedItem = state.cart.find(
        (item) => item.item === action.payload.id
      );
      if (selectedItem) {
        selectedItem.quantity -= 1;
      }
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addToCart,
  decreaseItemCount,
  increaseItemCount,
  setIsCartOpen,
} = userSlice.actions;

export default userSlice.reducer;
