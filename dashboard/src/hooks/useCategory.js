import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useAxiosPrivate from './useAxiosPrivate';
import { getCategories, createCategory } from '../services/CategoryService';
import useFormikHandler from './useFormikHandler';

const useCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const { handleFormikSubmit } = useFormikHandler();
  const [categories, setCategories] = useState([]);
  const [newCategoryAdded, setNewCategoryAdded] = useState(0); // This is to make the category selections reload when a new one is created

  // TODO: check what values and keys are and then rename them to be more descriptive
  const submitNewCategoryForm = async (values, onSubmitProps) => {
    try {
      await handleFormikSubmit({
        hasImages: false,
        serviceFunction: createCategory,
        values,
        onSubmitProps,
        successMessage: 'Category Created',
        errorMessage: 'Error Creating Category, wait a moment and try again',
      });
      setNewCategoryAdded(newCategoryAdded + 1);
    } catch (error) {
      //
    }
  };

  // GET ALL THE CATEGORIES
  const retreiveCategories = async () => {
    try {
      const response = await getCategories(axiosPrivate);
      setCategories(response);
    } catch (error) {
      toast.error("Sorry, I wasn't able to retrieve your categories.");
    }
  };

  // USE EFFECT
  useEffect(() => {
    retreiveCategories(categories);
  }, [newCategoryAdded]);

  return { categories, submitNewCategoryForm };
};

export default useCategory;
