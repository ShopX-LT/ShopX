import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Item from "../components/Item";
import PillButton from "../components/PillButton";
import { getAllItems } from "../services/ItemService";

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("chain");
  const [items, setItems] = useState([]);

  const changeCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const retrieveItems = async () => {
      const response = await getAllItems();
      if (!response) {
        setItems([]);
        return;
      }
      setItems(response);
    };
    retrieveItems();
  }, []);
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
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.title}
            description={""}
            price={item.price}
            discount={item.discount}
            id={item.id}
            image={item.imagesUrl[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
