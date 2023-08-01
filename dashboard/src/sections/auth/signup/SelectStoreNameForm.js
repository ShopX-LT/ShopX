import React, { useState } from 'react';
import { Formik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const lowercaseAndNoSpecialCharsSchema = Yup.string().test(
  'lowercase-and-no-special-chars',
  'Invalid format',
  (value) => {
    // Check if the value is in lowercase
    if (value !== value.toLowerCase()) {
      return false;
    }

    // Define the set of characters that are not allowed (e.g., uppercase letters and special characters)
    const forbiddenCharsRegex = /[A-Z!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`]/;

    // Check if the value contains any forbidden characters
    if (forbiddenCharsRegex.test(value)) {
      return false;
    }

    return true;
  }
);

// YUP DECLERACTIONS
const storeNameSchema = Yup.object().shape({
  storeName: Yup.string()
    .required('required')
    .transform((value) => value.toLowerCase()),
});

const SelectStoreNameForm = ({ setStoreName, setDisableNextButton }) => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setisLoading] = useState(false);

  const initialstoreName = {};

  const handleFormSubmit = () => {
    console.log('here');
    setDisableNextButton(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select your store name
      </Typography>

      <Formik onSubmit={handleFormSubmit} initialValues={initialstoreName} validationSchema={storeNameSchema}>
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
              label="Store name"
              name="storeName"
              error={Boolean(touched.storeName) && Boolean(errors.storeName)}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.storeName}
              fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" size="small" sx={{ mt: 2 }} type="submit">
                Check if my store name is valid
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default SelectStoreNameForm;
