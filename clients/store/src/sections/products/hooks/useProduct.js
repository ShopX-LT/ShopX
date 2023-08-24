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

  const retreiveQueryItems = async () => {
    const customFields = filterObject(selectedCustomCategories, customCategories);

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
