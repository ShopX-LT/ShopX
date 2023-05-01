import React from "react";
import Navbar from "../components/Navbar";
import Item from "../components/Item";

const ProductsPage = () => {
  return (
    <div>
      <Navbar page={"product"} />
      <div className="flex flex-row flex-wrap md:justify-start  justify-center sm:gap-[100px] gap-[20px]">
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
      </div>
    </div>
  );
};

export default ProductsPage;
