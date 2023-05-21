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
        <button
          className={`${styles.paragraph} flex-1 p-3 border-2 border-black rounded-[5px] text-black cursor-pointer text-center hover:text-white hover:bg-black`}
        >
          Buy Now
        </button>
        <button
          onClick={() => {
            dispatch(
              addToCart({ itemId: id, price: discountedPrice, quantity: 1 })
            );
          }}
        >
          ADD TO CART
          <svg width="40" height="40">
            <path
              d="M33.3334 25V30H38.3334V33.3333H33.3334V38.3333H30.0001V33.3333H25.0001V30H30.0001V25H33.3334ZM38.3334 16.6667L38.2667 17.15L36.6667 23C35.1457 22.1247 33.4212 21.6648 31.6663 21.6663C29.9113 21.6679 28.1877 22.1309 26.6681 23.0088C25.1486 23.8868 23.8866 25.1488 23.0088 26.6684C22.131 28.188 21.6682 29.9117 21.6667 31.6667C21.6667 32.8333 21.8834 33.95 22.2501 35H9.16675C7.86675 35 6.73342 34.25 6.18341 33.1667L1.83341 17.4L1.66675 16.6667C1.66675 15.75 2.41675 15 3.33341 15H10.9667L18.6334 4.05C18.7871 3.82645 18.9931 3.64393 19.2336 3.51836C19.474 3.3928 19.7416 3.32801 20.0128 3.32965C20.2841 3.33129 20.5508 3.39932 20.7897 3.52779C21.0286 3.65627 21.2325 3.84127 21.3834 4.06666L29.0334 15H36.6667C37.5834 15 38.3334 15.75 38.3334 16.6667ZM23.3334 25C23.3334 23.1667 21.8501 21.6667 20.0001 21.6667C18.1501 21.6667 16.6667 23.1667 16.6667 25C16.6667 26.8333 18.1667 28.3333 20.0001 28.3333C21.8334 28.3333 23.3334 26.85 23.3334 25ZM25.0001 15L20.0001 7.9L15.0001 15H25.0001Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Item;
