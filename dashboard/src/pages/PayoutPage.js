import {
  Box,
  Button,
  Card,
  Container,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { fCurrency } from '../utils/formatNumber';

const detailsSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  account_number: Yup.mixed().required('required'),
  bank: Yup.string().required('required'),
});

const PayoutPage = () => {
  const [banks, setBanks] = useState([]);
  const [balance, setBalance] = useState(0);
  const initialValues = {
    name: '',
    account_number: '',
    bank: '',
  };

  // const getBanks = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/payout/bank-list`, config);
  //     const bankNames = response.data.banks;
  //     setBanks(bankNames);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const getBalance = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/stats`, config);
  //     const stats = res.data.storeStats;
  //     setBalance(stats.balance);
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   getBanks();
  //   getBalance();
  // }, []);

  // Initial values

  const handleSubmitForm = async (values, onSubmitProps) => {
    // const formData = {};
    // for (let value in values) {
    //   formData[value] = values[value];
    // }
    // try {
    //   const payoutResponse = await axios.post(
    //     `${process.env.REACT_APP_SERVER_URL}/payout/bank-payout`,
    //     formData,
    //     config
    //   );
    //   onSubmitProps.resetForm();
    //   window.location.reload();
    // } catch (error) {
    //   if (error.response.data.message === 'Invalid accound details') {
    //     alert('Invalid accound details');
    //   } else {
    //     alert('Something went wrong');
    //   }
    // }
  };

  return (
    <Formik onSubmit={handleSubmitForm} initialValues={initialValues} validationSchema={detailsSchema}>
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
          <Container>
            <Card sx={{ display: 'flex', flexDirection: 'column', padding: 5, gap: 5 }}>
              <Typography variant="h4" align="center">
                Withdraw
              </Typography>
              <TextField
                label="Full name"
                name="name"
                error={Boolean(touched.name) && Boolean(errors.name)}
                // validate={validateUserName}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                // fullWidth
              />
              <TextField
                label="Account number"
                name="account_number"
                error={Boolean(touched.account_number) && Boolean(errors.account_number)}
                // validate={validateUseraccount_number}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.account_number}
                // fullWidth
              />
              <InputLabel id="bank">Bank name</InputLabel>
              <Select
                labelId="bank"
                label="Bank name"
                name="bank"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bank}
                fullWidth
              >
                <MenuItem value="">
                  <em>Select your bank</em>
                </MenuItem>
                {banks.map((bank, index) => {
                  return (
                    <MenuItem key={index} value={bank}>
                      <ListItemText primary={bank} />
                    </MenuItem>
                  );
                })}
              </Select>

              <Button variant="contained" sx={{ mt: 4, mx: 4, width: 'fit-content' }} type="submit">
                Withdraw &nbsp;{fCurrency(balance)}
              </Button>
            </Card>
          </Container>
        </form>
      )}
    </Formik>
  );
};

export default PayoutPage;
