import React from "react";
import Navbar from "../components/Navbar";
import Item from "../components/Item";
import PillButton from "../components/PillButton";
import { useState } from "react";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("chain");
  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  const categories = [
    { id: "1ca", name: "chain" },
    { id: "2ca", name: "necklace" },
    { id: "3ca", name: "earring" },
    { id: "4ca", name: "earring" },
  ];
  return (
    <div>
      <Navbar page={"product"} />
      <div className="mb-3 sticky top-0 z-10 flex flex-row flex-wrap justify-center items-center w-full bg-[#f1dbcc] border-b-2 border-b-black">
        {categories.map((category) => (
          <PillButton
            key={category.id}
            text={category.name}
            isSelected={selectedCategory === category.name}
            changeCategory={changeCategory}
          />
        ))}
      </div>

      <div className=" flex flex-row flex-wrap  justify-center sm:gap-[30px] gap-[20px]">
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
        <Item name={"Essence Chain"} description={"Chain"} price={"#1050"} />
      </div>
    </div>
  );
};

export default ProductsPage;
