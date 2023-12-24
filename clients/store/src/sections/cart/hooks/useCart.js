import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, increaseItemCount, decreaseItemCount, getCartTotal } from '../../../redux/cart/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleAddToCart = ({ id, title, discountedPrice, availableQuantity, store }) => {
    dispatch(
      addToCart({
        itemId: id,
        title: title,
        price: discountedPrice,
        quantity: 1,
        availableQuantity,
        store: store,
      })
    );
    toast.success('Added to cart');
  };
  const increaseCount = (id) => {
    dispatch(increaseItemCount({ id: id }));
  };
  const decreaseCount = (id) => {
    dispatch(decreaseItemCount({ id: id }));
  };
  const handleGetCartTotal = (store) => {
    dispatch(getCartTotal(store));
  };
  const getItemsInCartCount = (store) => {
    let count = 0;
    cartItems.forEach((item) => {
      if (item.store === store) count++;
    });
    return count;
  };
  return { handleAddToCart, increaseCount, decreaseCount, handleGetCartTotal, getItemsInCartCount };
};

export default useCart;
