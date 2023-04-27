import React, { useEffect, useState } from 'react';
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
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import Iconify from '../components/iconify';
import { AddField } from '../sections/@dashboard/products';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { createItem } from '../services/ItemService';
import { getCategories } from '../services/CategoryService';
import { getFields, creatField } from '../services/FieldService';

// YUP DECLERACTIONS
const itemShema = Yup.object().shape({
  title: Yup.string().required('required'),
  category: Yup.array().required('required'),
  description: Yup.string().required('required'),
  images: Yup.array().required('required'),
  price: Yup.mixed().required('required'),
  amount: Yup.number(),
  discount: Yup.number(),
});

const AddProductPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [productImages, setProductImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [storeFields, setStoreFields] = useState([]);
  const [field, setField] = useState('');
  const [openFieldDialog, setOpenFieldDialog] = useState(false);

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
  const handleFieldClickOpen = () => {
    setOpenFieldDialog(true);
  };
  const handleFieldClose = () => {
    setOpenFieldDialog(false);
  };

  // CREATING A FIELD
  const handleFieldSave = async () => {
    const newFields = await creatField(axiosPrivate, field);
    setStoreFields(newFields);
    setOpenFieldDialog(false);
  };
  const handleFieldChange = (event) => {
    setField(event.target.value);
  };
  // GET THE ITEM TEMPLATE
  const retreiveTemplate = async () => {
    const response = await getFields(axiosPrivate);
    if (!response) {
      setStoreFields([]);
    } else {
      setStoreFields(response);
    }
  };

  // USE EFFECT
  useEffect(() => {
    retreiveCategories();
    retreiveTemplate();
  }, []);

  // Initial Values
  const fields = storeFields.reduce((obj, key) => {
    obj[key] = '';
    return obj;
  }, {});
  const initialValueItem = {
    title: '',
    category: [],
    description: '',
    images: [],
    price: '',
    amount: '',
    discount: 0,
    ...fields,
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
    await createItem(axiosPrivate, formData);
    onSubmitProps.resetForm();
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
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleFieldClickOpen}>
                New Field
              </Button>
            </Stack>
            <AddField
              open={openFieldDialog}
              close={handleFieldClose}
              save={handleFieldSave}
              handleChange={handleFieldChange}
            />
            <Paper elevation={3} sx={{ p: 5, mb: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Title"
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
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.category}
                    >
                      <MenuItem value="">
                        <em>Select Category</em>
                      </MenuItem>
                      {categories.map((category) => {
                        return (
                          <MenuItem key={category.name} value={category.name} sx={{ textTransform: 'capitalize' }}>
                            <Checkbox checked={values.category.indexOf(category.name) > -1} />
                            <ListItemText primary={category.name} />
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Amount"
                    name="amount"
                    error={Boolean(touched.amount) && Boolean(errors.amount)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
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
                {storeFields.map((val, index) => {
                  return (
                    <Grid key={val} item xs={12} md={6}>
                      <TextField
                        label={val}
                        name={val}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values[{ val }]}
                        fullWidth
                      />
                    </Grid>
                  );
                })}
                <Grid item xs={12}>
                  <TextareaAutosize
                    label="Description"
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    minRows={4}
                    placeholder="Product description"
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              {/* ************************** */}
              <Box gridColumn="span 4" border={`1px solid black`} borderRadius="5px" p="1rem" m="1rem">
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple
                  onDrop={(newImages) => {
                    setProductImages((prevState) => {
                      const newState = [...prevState, ...newImages];
                      return newState;
                    });
                    setFieldValue('images', [...productImages, ...newImages]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`2px dashed black`}
                      p="1rem"
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />

                      <p>Add Picture Here</p>
                    </Box>
                  )}
                </Dropzone>
                <Box sx={{ m: 2, display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                  {values.images.map((image, index) => {
                    return (
                      <Box key={image.name}>
                        <img src={URL.createObjectURL(image)} alt={image.name} width={200} height={200} />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            alignItems: 'center',
                          }}
                        >
                          <Typography>{image.name}</Typography>
                          <IconButton
                            onClick={() => {
                              const newFiles = [...productImages];
                              newFiles.splice(index, 1);
                              setProductImages(newFiles);
                              setTimeout(() => {
                                setFieldValue('images', newFiles);
                              }, 0);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
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
