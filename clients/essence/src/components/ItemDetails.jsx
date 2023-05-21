import React from "react";
import useStyle from "../hooks/useStyle";
import { fCurrency } from "../utils/formatNumber";

const ItemDetails = ({ name, about, price, discountedPrice }) => {
  const { style } = useStyle();

  const hasDiscount = discountedPrice && price !== discountedPrice;
  const strikeThrough = "text-red-600 line-through";

  return (
    <div className="bg-white p-2 rounded-[5px] w-full flex justify-between items-center item-details ">
      <div className="flex-1">
        <h1 className={`${style.heading2}`}>{name}</h1>
        <p className={`${style.paragraph}`}>{about}</p>
      </div>
      <div>
        <p className={`${style.paragraph} ${hasDiscount ? strikeThrough : ""}`}>
          {fCurrency(price)}
        </p>
        {hasDiscount && (
          <p className={`${style.paragraph}`}>{fCurrency(discountedPrice)}</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
