import React, { useEffect, useState } from 'react';
import { getAllCategories, getCustomCategories } from '../../../services/categoryService';
import useAxiosWithStore from '../../../api/apiHooks/useAxiosWithStore';

const useCategory = () => {
  const axios = useAxiosWithStore();
  const [categories, setCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCustomCategories, setSelectedCustomCategories] = useState([]);

  const resetFilter = async () => {
    setSelectedCategory('');
    setSelectedCustomCategories([]);
    // await retrieveItems(axios);
  };

  const changeCategory = async (event) => {
    setSelectedCategory(event.target.value);
  };

  const changeCustomCategory = async (event) => {
    const value = event.target.value;
    if (selectedCustomCategories.includes(value)) {
      setSelectedCustomCategories((prevState) => prevState.filter((val) => val !== value));
    } else {
      setSelectedCustomCategories((prevState) => [...prevState, value]);
    }
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
    retrieveCategories();
    retrieveCustomCategories();
  }, []);

  return {
    categories,
    changeCategory,
    changeCustomCategory,
    customCategories,
    resetFilter,
    selectedCategory,
    selectedCustomCategories,
  };
};

export default useCategory;
