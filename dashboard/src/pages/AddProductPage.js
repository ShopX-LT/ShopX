import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
  TextareaAutosize,
  Container,
  Grid,
  ListItemText,
  Checkbox,
  styled,
  ListSubheader,
} from '@mui/material';
import _ from 'lodash';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Iconify from '../components/iconify';
import { AddField } from '../sections/@dashboard/products';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { createItem } from '../services/ItemService';
import { getCategories, createCategory } from '../services/CategoryService';
import { getFields, createFeature, createFeatureValue } from '../services/FieldService';
import ImageUploadBox from '../components/image-upload-box';
import SingleValueTextFieldForm from '../components/singleValueTextFieldForm';

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

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    border: 1px solid grey;
  `
);

const AddProductPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [productImages, setProductImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [storeOptions, setStoreOptions] = useState([]);
  const [newCategoryAdded, setNewCategoryAdded] = useState(0); // This is to make the category selections reload when a new one is created
  const [field, setField] = useState('');
  const [openNewFeatureDialog, setOpenNewFeatureDialog] = useState(false);

  // GET ALL THE CATEGORIES
  const retreiveCategories = async () => {
    const response = await getCategories(axiosPrivate);
    if (!response) {
      setCategories([]);
    } else {
      setCategories(response);
    }
  };

  // FIELD DIALOG CONTROLLER
  const handleOpenNewFeatureDialog = () => {
    setOpenNewFeatureDialog(true);
  };
  const handleFieldClose = () => {
    setOpenNewFeatureDialog(false);
  };

  // CREATING A FEATURE
  const handleNewFeatureSave = async (values, onSubmitProps) => {
    try {
      const options = await createFeature(axiosPrivate, toast, values.name);
      setStoreOptions(options);
      setOpenNewFeatureDialog(false);
      onSubmitProps.resetForm();
    } catch (error) {
      // alert(error.message);
    }
  };

  // CREATING A FEATURE VALUE
  const handleNewFeatureValue = async (values, onSubmitProps, feature) => {
    try {
      const options = await createFeatureValue(axiosPrivate, toast, feature, values.name);
      setStoreOptions(options);
      onSubmitProps.resetForm();
    } catch (error) {
      // alert(error.message);
    }
  };

  // GET THE ITEM TEMPLATE
  const retreiveTemplate = async () => {
    const response = await getFields(axiosPrivate);
    if (!response) {
      setStoreOptions([]);
    } else {
      setStoreOptions(response);
    }
  };

  // USE EFFECT
  useEffect(() => {
    retreiveCategories();
  }, [newCategoryAdded]);
  useEffect(() => {
    retreiveTemplate();
  }, []);

  // Initial Values
  const options = storeOptions.reduce((objectOfFeatures, currentOption) => {
    objectOfFeatures[currentOption.feature] = [];
    return objectOfFeatures;
  }, {});

  const initialValueItem = {
    title: '',
    category: [],
    description: '',
    images: [],
    price: '',
    quantity: '',
    discount: 0,
    ...options,
  };
  /**
   * Handle form submit event.
   *
   * @param {object} values - Object containing form values.
   * @param {object} onSubmitProps - Props passed to the form onSubmit handler.
   */
  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // Append each image file to the formData object.
    values.images.forEach((image) => {
      formData.append('images', image);
    });

    // Send formData object to server to create item.
    await createItem(axiosPrivate, toast, formData);
    onSubmitProps.resetForm();
    setProductImages((prevState) => {
      const newState = [];
      return newState;
    });
  };

  // TODO: Take this out into a category funtion file, this is duplicate code from the CategoryPage
  // CREATING A NEW CATEGORY
  const handleNewCategorySubmitForm = async (values, onSubmitProps) => {
    const formData = {};
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData[key] = values[key];
    });
    try {
      const response = await createCategory(axiosPrivate, toast, formData);
      onSubmitProps.resetForm();
      setNewCategoryAdded(newCategoryAdded + 1);
    } catch (error) {
      // alert(error.message);
    }
  };

  // RETURN
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
            <AddField open={openNewFeatureDialog} close={handleFieldClose}>
              <SingleValueTextFieldForm handleSubmitForm={handleNewFeatureSave} label="Feature Name" />
            </AddField>
            <Paper elevation={3} sx={{ p: 5, mb: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Product Name"
                    name="title"
                    error={Boolean(touched.title) && Boolean(errors.title)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    fullWidth
                  />
                </Grid>

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
                      {categories.map((category) => {
                        return (
                          <MenuItem key={category.name} value={category.name} sx={{ textTransform: 'capitalize' }}>
                            <Checkbox checked={values.category.indexOf(category.name) > -1} />
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        );
                      })}
                      <ListSubheader>Create Category</ListSubheader>
                      <SingleValueTextFieldForm handleSubmitForm={handleNewCategorySubmitForm} />
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Quantity"
                    name="quantity"
                    error={Boolean(touched.quantity) && Boolean(errors.quantity)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.quantity}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Price"
                    name="price"
                    error={Boolean(touched.price) && Boolean(errors.price)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Discount"
                    name="discount"
                    error={Boolean(touched.discount) && Boolean(errors.discount)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.discount}
                    fullWidth
                  />
                </Grid>
                {storeOptions.map((option) => {
                  return (
                    <Grid key={option.feature} item xs={12} md={6}>
                      {/* <TextField
                        label={_.upperFirst(option.feature)}
                        name={option.feature}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[option.feature]}
                        fullWidth
                      /> */}

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
                          {option.values.map((value) => {
                            return (
                              <MenuItem
                                key={`${option.feature}-${value}`}
                                value={value}
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {/* <Checkbox checked={values.category.indexOf(category.name) > -1} /> */}
                                <ListItemText primary={value} />
                              </MenuItem>
                            );
                          })}
                          <ListSubheader>Create a new {option.feature} option</ListSubheader>
                          <SingleValueTextFieldForm
                            handleSubmitForm={(values, onSubmitProps) => {
                              handleNewFeatureValue(values, onSubmitProps, option.feature);
                            }}
                            label="New option"
                          />
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                })}
                <Grid item xs={12}>
                  <StyledTextarea
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    minRows={2}
                    placeholder="Product description"
                    style={{ width: '100%' }}
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
  );
};

export default AddProductPage;
