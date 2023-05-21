import React from "react";
import { useSelector } from "react-redux";
import CheckoutItem from "./CheckoutItem";
import useStyle from "../hooks/useStyle";

const CartList = ({ custom_styles }) => {
  const { style } = useStyle();
  const cart = useSelector((state) => state.cart);
  return (
    <div className={`flex flex-col w-full ${custom_styles}`}>
      {cart.map((item) => (
        <CheckoutItem
          key={item.itemId}
          id={item.itemId}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
};

export default CartList;
