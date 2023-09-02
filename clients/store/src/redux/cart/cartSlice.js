import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { itemId, title, price, quantity, availableQuantity, store } = action.payload;
      const item = state.cart.find((item) => item.itemId === itemId);
      if (item) {
        // if (!item.quantity >= availableQuantity) {
        item.quantity += 1;
        state.total += price;
        // }
      } else {
        state.cart.push({ itemId, title, price, quantity, availableQuantity, store });
        state.total += price;
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
    clearCart: (state, action) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, decreaseItemCount, increaseItemCount, setIsCartOpen, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
