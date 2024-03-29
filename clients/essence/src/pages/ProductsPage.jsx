import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import Item from "../components/Item";
import ShopFilterSidebar from "../components/ShopFilterSidebar";
import { getAllItems, queryItems } from "../services/itemService";
import {
  getAllCategories,
  getCustomCategories,
} from "../services/categoryService";
import useAxiosWithStore from "../api/hooks/useAxiosWithStore";

const ProductsPage = () => {
  const axios = useAxiosWithStore();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCustomCategories, setSelectedCustomCategories] = useState([]);
  // create a current filter options so that it can be displayed to the user
  const [openFilter, setOpenFilter] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState({});

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const resetFilter = async () => {
    setSelectedCategory("");
    setSelectedCustomCategories([]);
    await retrieveItems(axios);
  };

  const filterObject = (array, object) => {
    const filteredObject = {};

    Object.entries(object).forEach(([key, values]) => {
      const matchingValues = values.filter((value) => array.includes(value));
      if (matchingValues.length > 0) {
        filteredObject[key] = matchingValues;
      }
    });

    return filteredObject;
  };

  const changeCategory = async (event) => {
    setSelectedCategory(event.target.value);
  };

  const changeCustomCategory = async (event) => {
    const value = event.target.value;
    if (selectedCustomCategories.includes(value)) {
      setSelectedCustomCategories((prevState) =>
        prevState.filter((val) => val !== value)
      );
    } else {
      setSelectedCustomCategories((prevState) => [...prevState, value]);
    }
  };

  const retreiveQueryItems = async () => {
    const customFields = filterObject(
      selectedCustomCategories,
      customCategories
    );
    const response = await queryItems(axios, selectedCategory, customFields);
    if (!response) {
      setItems([]);
      return;
    }
    setItems(response);
  };

  const retrieveItems = async () => {
    const response = await getAllItems(axios);
    if (!response) {
      setItems([]);
      return;
    }
    setItems(response);
  };

  const retrieveCategories = async () => {
    const response = await getAllCategories(axios);
    if (!response) {
      setCategories([]);
      return;
    }
    setCategories(response);
  };

  const retrieveCustomCategories = async () => {
    const response = await getCustomCategories(axios);
    if (!response) {
      setCustomCategories([]);
      return;
    }
    setCustomCategories(response);
  };

  useEffect(() => {
    // retrieveItems();
    retrieveCategories();
    retrieveCustomCategories();
  }, []);

  useEffect(() => {
    retreiveQueryItems();
  }, [selectedCustomCategories, selectedCategory]);

  return (
    <div>
      <Navbar page={"product"} />
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="flex-start"
        className="mb-4 mt-2"
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ShopFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            categories={categories}
            selectedCategory={selectedCategory}
            customCategories={customCategories}
            selectedCustomCategories={selectedCustomCategories}
            onFilterOptionsChange={changeCategory}
            changeCustomCategory={changeCustomCategory}
            resetFilter={resetFilter}
          />
          {/* <ProductSort /> */}
        </Stack>
      </Stack>

      <div className=" flex flex-row flex-wrap  justify-start sm:gap-[30px] gap-[20px]">
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.title}
            description={item.description}
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
