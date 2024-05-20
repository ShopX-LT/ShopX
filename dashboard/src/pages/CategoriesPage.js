import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
// @mui
import { Card, Stack, Container, Typography } from '@mui/material';

import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getCategories, createCategory, deleteCategory } from '../services/CategoryService';
import SingleValueTextFieldForm from '../components/singleValueTextFieldForm';
import SortableTable from '../components/sortableTable';
import CategoryListItem from '../sections/@dashboard/category/CategoryListItem';

const TABLE_HEAD = [{ id: 'name', label: 'Name', alignRight: false }];

const CategoriesPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [categoryList, setCategoryList] = useState([]);

  // GET ALL THE CATEGORIES
  const retreiveCategories = async () => {
    const response = await getCategories(axiosPrivate);
    if (!response) {
      setCategoryList([]);
    } else {
      setCategoryList(response);
    }
  };

  // CREATING A NEW CATEGORY
  const handleNewCategorySubmitForm = async (values, onSubmitProps) => {
    const formData = {};
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData[key] = values[key];
    });
    try {
      const response = await createCategory(axiosPrivate, toast, formData);
      if (response) {
        await retreiveCategories();
      }
      onSubmitProps.resetForm();
    } catch (error) {
      // alert(error.message);
    }
  };

  const handleDeleteCategory = async (categoryId, categoryName) => {
    try {
      const response = await deleteCategory(axiosPrivate, toast, categoryId, categoryName);
      if (response) {
        await retreiveCategories();
      }
    } catch (error) {
      // eslint-disable-next-line
    }
  };

  // USE EFFECT
  useEffect(() => {
    retreiveCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title> Categories </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Categories
          </Typography>
        </Stack>

        <Card>
          {/* <CategoryListToolbar FilterCategory={FilterCategory} onFilterCategory={handleFilterByName} /> */}

          <SortableTable
            headerArray={TABLE_HEAD}
            listItems={categoryList}
            bodyComponent={(category) => (
              <CategoryListItem key={category.id} category={category} handleDeleteCategory={handleDeleteCategory} />
            )}
          />
        </Card>
        <Typography sx={{ marginTop: 5 }} variant="h4" gutterBottom>
          Add Category
        </Typography>
        <Card>
          <SingleValueTextFieldForm label="Category Name" handleSubmitForm={handleNewCategorySubmitForm} />
        </Card>
      </Container>
    </>
  );
};

export default CategoriesPage;
