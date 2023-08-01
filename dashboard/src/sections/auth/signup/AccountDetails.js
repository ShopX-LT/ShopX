import React, { useState } from 'react';
import { Formik } from 'formik';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

// YUP DECLERACTIONS
const storeNameSchema = Yup.object().shape({
  email: Yup.string().email().required('You need to enter a valid email'),
  password: Yup.string().min(7, 'Password must be atleast 7 charactes long').required('Enter a password'),
});

const AccountDetails = ({ setStoreName, setDisableNextButton }) => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setisLoading] = useState(false);
  const [accountType, setAccountType] = useState('new');

  const initialstoreName = {};

  const handleFormSubmit = () => {
    console.log('here');
    setDisableNextButton(false);
  };

  const handleChange = (event) => {
    setAccountType(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>

      <FormControl>
        <RadioGroup
          aria-label="account type"
          name="accountType"
          defaultValue={accountType}
          value={accountType}
          onChange={handleChange}
        >
          <FormControlLabel
            value="old"
            control={<Radio />}
            label="I already have store with ShopX registered to this email address"
          />
          <FormControlLabel
            value="new"
            control={<Radio />}
            size="small"
            label="This is my first time creating a store with ShopX with this email address"
          />
        </RadioGroup>
      </FormControl>
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
              label="Email"
              type="email"
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              fullWidth
              margin="dense"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" size="small" sx={{ mt: 2 }} type="submit">
                {accountType === 'new' ? 'Create a new account' : 'Add to my existing account'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AccountDetails;
