import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Button, TextField } from '@mui/material';
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { updateItem } from '../../../services/ItemService';

// YUP DECLERACTIONS
const itemShema = Yup.object().shape({
  title: Yup.string().required('required'),
  price: Yup.mixed().required('required'),
  quantity: Yup.number('required'),
  discount: Yup.number('required'),
});

const EditProductForm = ({ product, onCloseFilter }) => {
  const axiosPrivate = useAxiosPrivate();
  const { title, price, discount, quantity, id } = product;
  // use api to get the items info
  const initialValueItem = {
    title,
    price,
    quantity,
    discount,
  };

  /**
   * Handle form submit event.
   *
   * @param {object} values - Object containing form values.
   * @param {object} onSubmitProps - Props passed to the form onSubmit handler.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = {};
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData[key] = values[key];
    });

    // Send formData object to server to create item.
    await updateItem(axiosPrivate, toast, id, formData);
    // set the drawer to close and reload the page
    onCloseFilter();
    window.location.reload();
    onSubmitProps.resetForm();
  };

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValueItem} validationSchema={itemShema}>
      {({
        values,
        errors,
        touched,
        isValidating,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            error={Boolean(touched.title) && Boolean(errors.title)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Quantity"
            name="quantity"
            error={Boolean(touched.quantity) && Boolean(errors.quantity)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.quantity}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            error={Boolean(touched.price) && Boolean(errors.price)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.price}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Discount"
            name="discount"
            error={Boolean(touched.discount) && Boolean(errors.discount)}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.discount}
            fullWidth
          />
          <Box sx={{ mx: 'auto' }}>
            <Button variant="contained" sx={{ mt: 4 }} type="submit" fullWidth>
              Save
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default EditProductForm;
