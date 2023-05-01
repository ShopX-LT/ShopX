import React from "react";
import styles from "../style";
import { fCurrency } from "../utils/formatNumber";

const ItemDetails = ({ name, about, price }) => {
  return (
    <div className="bg-white p-2 rounded-[5px] w-full flex justify-between items-center item-details ">
      <div className="flex-1">
        <h1 className={`${styles.heading2}`}>{name}</h1>
        <p className={`${styles.paragraph}`}>{about}</p>
      </div>
      <div className={`${styles.paragraph}`}>{fCurrency(price)}</div>
    </div>
  );
};

export default ItemDetails;
