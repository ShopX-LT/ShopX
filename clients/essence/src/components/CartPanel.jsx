import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyle from "../hooks/useStyle";
import CartList from "./CartList";
import { setIsCartOpen } from "../state";
import Button from "./Button";

import { fCurrency } from "../utils/formatNumber";
import { useNavigate } from "react-router-dom";

const CartPanel = () => {
  const { style } = useStyle();
  const navigate = useNavigate();
  const total = useSelector((state) => state.total);
  const isCartOpen = useSelector((state) => state.isCartOpen);
  const panelStyle =
    "sidebar fixed right-0 mx-2 z-40 xs:w-[300px] max-w-[320px]  bg-neutral-200 drop-shadow-xl rounded-md p-6 ";
  const panelHeader =
    "text-[20px] flex items-center justify-center mb-4 w-full";

  return (
    <div className="relative flex justify-end ">
      <div className={`${panelStyle}`}>
        <h1 className={`${style.paragraph}  ${panelHeader} `}>CART</h1>
        <CartList />
        <p className={`${style.paragraph} my-6`}>
          <span className={`${style.heading2}`}>Total:</span> {fCurrency(total)}
        </p>
        <Button
          custom_styles={`w-full`}
          text="Checkout"
          onclick={() => {
            navigate("/checkout");
          }}
        />
      </div>
    </div>
  );
};

export default CartPanel;
