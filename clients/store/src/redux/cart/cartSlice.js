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
        // }
      } else {
        state.cart.push({ itemId, title, price, quantity, availableQuantity, store });
      }
      state.total = 0;
      state.cart.forEach((item) => {
        if (item.store === store) state.total += item.price * item.quantity;
      });
    },

    increaseItemCount: (state, action) => {
      const { id } = action.payload;
      const item = state.cart.find((item) => item.itemId === id);

      if (item) {
        // state.total += item.price;
        item.quantity += 1;
        state.total = 0;
        state.cart.forEach((i) => {
          if (item.store === i.store) state.total += i.price * i.quantity;
        });
      }
    },

    decreaseItemCount: (state, action) => {
      const { id } = action.payload;
      const selectedItem = state.cart.find((item) => item.itemId === id);
      if (selectedItem) {
        if (selectedItem.quantity > 1) {
          selectedItem.quantity -= 1;
          // state.total -= selectedItem.price;
        } else {
          state.cart = state.cart.filter((item) => item.itemId !== id);
          // state.total -= selectedItem.price;
        }
        state.total = 0;
        state.cart.forEach((item) => {
          if (selectedItem.store === item.store) state.total += item.price * item.quantity;
        });
      }
    },
    clearCart: (state, action) => {
      const newCart = state.cart.filter((item) => {
        item.store !== action.payload;
      });
      state.cart = newCart;
      state.total = 0;
    },
    getCartTotal: (state, action) => {
      state.total = 0;
      state.cart.forEach((item) => {
        if (action.payload === item.store) state.total += item.price * item.quantity;
      });
    },
  },
});

export const { addToCart, decreaseItemCount, increaseItemCount, setIsCartOpen, clearCart, getCartTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
