import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ItemDetails from "./ItemDetails";
import styles from "../style";
import { addToCart } from "../state";

const Item = ({ image, id, name, description, price, discount }) => {
  const dispatch = useDispatch();
  const discountedPrice = price * (1 - discount / 100);

  return (
    <div className="flex flex-col">
      <div
        className="flex bg-cover items-end px-2 py-2 rounded-[8px] w-[300px] h-[350px] box-shadow "
        style={{ backgroundImage: `url(${image})` }}
      >
        <ItemDetails
          name={name}
          about={description}
          price={price}
          discountedPrice={discountedPrice}
        />
      </div>
      <div className="flex flex-row justify-between items-center px-2 gap-6 mt-2">
        {/* <button
          className={`${styles.paragraph} flex-1 p-3 border-2 border-black rounded-[5px] text-black cursor-pointer text-center hover:text-white hover:bg-black`}
          aria-label="Buy now"
        >
          Buy Now
        </button> */}
        <button
          className={`${styles.paragraph} flex-1 p-3 border-2 border-black rounded-[5px] hover:drop-shadow-lg`}
          onClick={() => {
            dispatch(
              addToCart({ itemId: id, price: discountedPrice, quantity: 1 })
            );
          }}
          aria-label="Add to cart"
        >
          <span className="flex flex-row items-center justify-center gap-4">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M15 15V22.5M18.75 18.75H11.25M9.375 10.3125V8.4375C9.375 6.94566 9.96763 5.51492 11.0225 4.46002C12.0774 3.40513 13.5082 2.8125 15 2.8125C16.4918 2.8125 17.9226 3.40513 18.9775 4.46002C20.0324 5.51492 20.625 6.94566 20.625 8.4375V10.3125M4.6875 10.3125C4.43886 10.3125 4.2004 10.4113 4.02459 10.5871C3.84877 10.7629 3.75 11.0014 3.75 11.25V23.9062C3.75 25.6781 5.25938 27.1875 7.03125 27.1875H22.9688C24.7406 27.1875 26.25 25.7514 26.25 23.9795V11.25C26.25 11.0014 26.1512 10.7629 25.9754 10.5871C25.7996 10.4113 25.5611 10.3125 25.3125 10.3125H4.6875Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            ADD TO CART
          </span>
        </button>
      </div>
    </div>
  );
};

export default Item;
