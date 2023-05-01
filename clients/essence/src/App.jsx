import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import defaultStyle, { editStyle } from "./style";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import { useEffect } from "react";
import { useState } from "react";
import useStyle from "./hooks/useStyle";

const mock = {
  primaryColor: "brown-gradient",
  brandColor: "[#000]",
  secondaryColor: "[#fff]",
  textColor1: "[#fff]",
};
//REPLACE WITH API

const App = () => {
  const { style, setStyle } = useStyle();

  useEffect(() => {
    const presetStyles = editStyle(style, {
      primaryColor: `bg-${mock.primaryColor}`,
      brandColor: `bg-${mock.primaryColor}`,
      secondaryColor: `bg-${mock.secondaryColor}`,
      textColor1: `bg-${mock.textColor1}`,
    });
    setStyle(() => presetStyles);
  }, []);

  return (
    <div>
      {/* {setDefault()} */}
      <div
        className={`w-full ${style.primaryColor}  min-h-[100vh] flex justify-center`}
      >
        <div className={`${style.container} sm:px-16 px-6`}>
          <BrowserRouter>
            <Router styles={style} />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
