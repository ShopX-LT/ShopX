import React, { useEffect, useState } from 'react';
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
import { fCurrency } from '../utils/formatNumber';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getBankList, requestPayout } from '../services/PaymentService';


const detailsSchema = Yup.object().shape({
  name: Yup.string().required('required'),
  account_number: Yup.mixed().required('required'),
  bank: Yup.string().required('required'),
});

const PayoutPage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [banks, setBanks] = useState([]);

  // Initial values
  const initialValues = {
    name: '',
    account_number: '',
    bank: '',
  };

  const bankList = async () => {
    const banks = await getBankList(axiosPrivate);
    if (!banks) {
      setBanks([]);
      return;
    }
    setBanks(banks);
  };

  useEffect(() => {
    bankList();
  }, []);

  const handleSubmitForm = async (values, onSubmitProps) => {
    const formData = new FormData();
    // Append each form value to the formData object.
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    const payoutResponse = await requestPayout(axiosPrivate, formData);
    if (!payoutResponse) {
      alert('Something went wrong. Try again later');
      return;
    }
    onSubmitProps.resetForm();

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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                // fullWidth
              />
              <TextField
                label="Account number"
                name="account_number"
                error={Boolean(touched.account_number) && Boolean(errors.account_number)}
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
              >
                <MenuItem value="">
                  <em>Select your bank</em>
                </MenuItem>
                {banks.map((bank) => {
                  return (
                    <MenuItem key={bank} value={bank}>
                      <ListItemText primary={bank} />
                    </MenuItem>
                  );
                })}
              </Select>

              <Button variant="contained" sx={{ mt: 4, mx: 4, width: 'fit-content' }} type="submit">
                Withdraw
              </Button>
            </Card>
          </Container>
        </form>
      )}
    </Formik>
  );
};

export default PayoutPage;
