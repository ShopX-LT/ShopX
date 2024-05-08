import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Container,
  Grid,
  ListItemText,
  Checkbox,
  ListSubheader,
} from '@mui/material';
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Iconify from '../components/iconify';
import { AddFieldDialog } from '../sections/@dashboard/products';
import useCategory from '../hooks/useCategory';
import useFeature from '../hooks/useFeature';
import useFormikHandler from '../hooks/useFormikHandler';
import { createItem } from '../services/ItemService';
import ImageUploadBox from '../components/image-upload-box';
import SingleValueTextFieldForm from '../components/singleValueTextFieldForm';
import TextArea from '../components/textArea';

// YUP DECLERACTIONS
const itemShema = Yup.object().shape({
  title: Yup.string().required('name your item'),
  category: Yup.array(),
  description: Yup.string(),
  images: Yup.array().required('add some images of your item'),
  price: Yup.mixed().required('what is the price of this item?'),
  quantity: Yup.number(),
  discount: Yup.number(),
});

function capitalizeArrayStrings(arr) {
  return arr.map((str) => _.upperFirst(str));
}

const fixedTextFields = ['title', 'price', 'quantity', 'discount'];

const AddProductPage = () => {
  const { categories, submitNewCategoryForm } = useCategory();
  const { createNewField, createNewFeatureValue, formikFields, itemCustomFields } = useFeature();
  const { handleFormikSubmit } = useFormikHandler();

  const [productImages, setProductImages] = useState([]);
  const [openNewFeatureDialog, setOpenNewFeatureDialog] = useState(false);

  // FIELD DIALOG CONTROLLER
  const handleOpenNewFeatureDialog = () => {
    setOpenNewFeatureDialog(true);
  };
  const handleFieldClose = () => {
    setOpenNewFeatureDialog(false);
  };

  // Initial Values
  const initialValueItem = {
    title: '',
    category: [],
    description: '',
    images: [],
    price: '',
    quantity: '',
    discount: 0,
    ...formikFields,
  };
  /**
   * Handle form submit event.
   *
   * @param {object} values - Object containing form values.
   * @param {object} onSubmitProps - Props passed to the form onSubmit handler.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await handleFormikSubmit({
        hasImages: true,
        serviceFunction: createItem,
        values,
        onSubmitProps,
        successMessage: 'Item Created',
        errorMessage: 'An error occurred creating this item',
      });
      setProductImages(() => {
        const newState = [];
        return newState;
      });
    } catch (error) {
      //
    }
  };

  // RETURN
  return (
    <>
      <Helmet>
        <title> Add Product </title>
      </Helmet>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValueItem} validationSchema={itemShema}>
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Container sx={{ my: 'auto', mx: 'auto' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  New Product
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleOpenNewFeatureDialog}
                >
                  New Feature
                </Button>
              </Stack>
              <AddFieldDialog open={openNewFeatureDialog} close={handleFieldClose}>
                <SingleValueTextFieldForm handleSubmitForm={createNewField} label="Feature Name" />
              </AddFieldDialog>
              <Paper elevation={3} sx={{ p: 5, mb: 1 }}>
                <Grid container spacing={2}>
                  {fixedTextFields.map((fieldName) => (
                    <Grid key={fieldName} item xs={12} md={6}>
                      <TextField
                        label={_.upperFirst(fieldName)}
                        name={fieldName}
                        error={Boolean(touched[fieldName]) && Boolean(errors[fieldName])}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[fieldName]}
                        fullWidth
                      />
                    </Grid>
                  ))}

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="category">Category</InputLabel>
                      <Select
                        labelId="Category"
                        name="category"
                        multiple
                        renderValue={(selected) => capitalizeArrayStrings(selected).join(', ')}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.category}
                      >
                        <ListSubheader>Select Category</ListSubheader>
                        {categories.map((category) => (
                          <MenuItem key={category.name} value={category.name} sx={{ textTransform: 'capitalize' }}>
                            <Checkbox checked={values.category.indexOf(category.name) > -1} />
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        ))}
                        <ListSubheader>Create Category</ListSubheader>
                        <SingleValueTextFieldForm handleSubmitForm={submitNewCategoryForm} />
                      </Select>
                    </FormControl>
                  </Grid>
                  {itemCustomFields.map((option) => (
                    <Grid key={option.feature} item xs={12} md={6}>
                      {/* TODO move this to be a component */}
                      <FormControl fullWidth>
                        <InputLabel id={option.feature}>{_.upperFirst(option.feature)}</InputLabel>
                        <Select
                          labelId={_.upperFirst(option.feature)}
                          name={option.feature}
                          renderValue={(selected) => _.upperFirst(selected)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values[option.feature]}
                        >
                          <ListSubheader>Select {option.feature}</ListSubheader>
                          {option.values.map((value) => (
                            <MenuItem
                              key={`${option.feature}-${value}`}
                              value={value}
                              sx={{ textTransform: 'capitalize' }}
                            >
                              <ListItemText primary={value} />
                            </MenuItem>
                          ))}
                          <ListSubheader>Create a new {option.feature} option</ListSubheader>
                          <SingleValueTextFieldForm
                            handleSubmitForm={(values, onSubmitProps) => {
                              createNewFeatureValue(values, onSubmitProps, option.feature);
                            }}
                            label="New option"
                          />
                        </Select>
                      </FormControl>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <TextArea
                      minRows={2}
                      label="Description"
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      placeholder="Product description"
                    />
                  </Grid>
                </Grid>
                {/* ************************** */}
                <ImageUploadBox
                  setImages={setProductImages}
                  images={productImages}
                  setFieldValue={setFieldValue}
                  uploadedImages={values.images}
                  field="images"
                />

                <Box sx={{ mx: 'auto' }}>
                  <Button variant="contained" sx={{ mt: 4 }} type="submit" fullWidth>
                    Save
                  </Button>
                </Box>
              </Paper>
            </Container>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddProductPage;
