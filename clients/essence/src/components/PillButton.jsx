import React from "react";
import useStyle from "../hooks/useStyle";

const shape =
  "m-3 px-4 py-2  ease-out duration-300 rounded-[8px] text-[18px] font-poppins font-normal shadow-xl";
const selected = "text-white bg-black";
const notSelected =
  "outline outline-1 outline-offset-2 outline-black bg-[#f1dbcc]";
const hover = "hover:outline-2  hover:duration-100 ";

const PillButton = ({ text, isSelected, changeCategory }) => {
  const { style } = useStyle();
  const handleOnClick = () => {
    changeCategory(text);
  };

  return (
    <button
      className={`${shape} ${isSelected ? selected : notSelected} ${hover}`}
      onClick={handleOnClick}
    >
      {text}
    </button>
  );
};

export default PillButton;
