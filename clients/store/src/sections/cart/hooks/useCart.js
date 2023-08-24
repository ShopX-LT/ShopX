import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart, increaseItemCount, decreaseItemCount } from '../../../redux/cart/cartSlice';

const useCart = () => {
  const dispatch = useDispatch();
  const handleAddToCart = ({ id, title, discountedPrice }) => {
    dispatch(addToCart({ itemId: id, title: title, price: discountedPrice, quantity: 1 }));
    toast.success('Added to cart');
  };
  const increaseCount = (id) => {
    dispatch(increaseItemCount({ id: id }));
  };
  const decreaseCount = (id) => {
    dispatch(decreaseItemCount({ id: id }));
  };
  return { handleAddToCart, increaseCount, decreaseCount };
};

export default useCart;
