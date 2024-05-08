import { Box, Button, TextField, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';

const itemShema = Yup.object().shape({
  name: Yup.string().required('required'),
});

const SingleValueTextFieldForm = (props) => {
  const initialValueItem = {
    name: '',
  };

  return (
    <Formik onSubmit={props.handleSubmitForm} initialValues={initialValueItem} validationSchema={itemShema}>
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
          <Grid container p={2} alignItems="center" justifyContent="start">
            <Grid item xs={8} md={6}>
              <TextField
                label={props.label || 'Category name'}
                name="name"
                error={Boolean(touched.name) && Boolean(errors.name)}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={(e) => e.stopPropagation()}
                value={values.name}
                fullWidth
              />
            </Grid>

            <Grid item xs={4} md={4}>
              <Box sx={{ margin: 'auto' }} align="center">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default SingleValueTextFieldForm;
