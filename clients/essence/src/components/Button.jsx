import React from "react";
import useStyle from "../hooks/useStyle";

const Button = ({ onclick, custom_styles, text, children }) => {
  const { style } = useStyle();
  const defaultStyle = `bg-black py-2 px-6 rounded-md`;
  const onHover = "hover:shadow-md";

  return (
    <button
      className={`${custom_styles} ${defaultStyle} ${onHover} ${style.paragraph} text-white`}
      onClick={onclick}
    >
      {text} {children}
    </button>
  );
};

export default Button;
