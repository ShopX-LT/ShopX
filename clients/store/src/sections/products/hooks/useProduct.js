import React, { useEffect, useState } from 'react';
import { queryItems, searchItems } from '../../../services/itemService';
import useAxiosWithStore from '../../../api/apiHooks/useAxiosWithStore';

const useProduct = ({ selectedCustomCategories, customCategories, selectedCategory }) => {
  const axios = useAxiosWithStore();
  const [items, setItems] = useState([]);
  const [searchParam, setSearchParam] = useState('');

  const handleSearchChange = (e) => {
    setSearchParam(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchParam !== '') {
      const response = await searchItems(axios, searchParam);
      if (!response) {
        setItems([]);
        return;
      }
      setItems(response);
    }
  };

  // @TODO move this to a helper file
  const buildCustomCategoryQuery = (selectedCategories, customCategories) => {
    const queryObject = {}; // {'feature': ['selected value']}

    customCategories.forEach((option) => {
      const selectedValues = option.values.filter((value) => selectedCategories.includes(value));
      if (selectedValues.length > 0) {
        queryObject[option.feature] = selectedValues;
      }
    });

    return queryObject;
  };

  const retreiveQueryItems = async () => {
    const customFields = buildCustomCategoryQuery(selectedCustomCategories, customCategories);

    const response = await queryItems(axios, selectedCategory, customFields);
    if (!response) {
      setItems([]);
      return;
    }
    setItems(response);
  };

  useEffect(() => {
    retreiveQueryItems();
  }, [selectedCustomCategories, selectedCategory]);

  return { items, searchParam, handleSearchChange, handleSearch };
};

export default useProduct;
