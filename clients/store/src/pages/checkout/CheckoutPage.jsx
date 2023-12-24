import React, { Fragment, useState } from 'react';
import {
  CssBaseline,
  AppBar,
  Box,
  Container,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
} from '@mui/material';
import AddressForm from '../../components/forms/checkout/AddressForm';
import Review from './ReviewStep';
import useAxiosWithStore from '../../api/apiHooks/useAxiosWithStore';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cart/cartSlice';
import { updateUser } from '../../redux/user/userSlice';
import { createOrder } from '../../services/checkoutService';
import useCart from '../../sections/cart/hooks/useCart';
import useStore from '../../hooks/useStore';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://myshopx.net/">
        ShopX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Review your order'];

export default function CheckoutPage() {
  const { store } = useStore();
  const axios = useAxiosWithStore();
  const dispatch = useDispatch();
  const { getItemsInCartCount } = useCart();
  const cartItems = useSelector((state) => state.cart.cart);
  const cartLength = getItemsInCartCount(store);
  const storedUserDetails = useSelector((state) => state.user);
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState(storedUserDetails.email);
  const [address1, setAddress1] = useState(storedUserDetails.address1);
  const [address2, setAddress2] = useState(storedUserDetails.address2);
  const [city, setCity] = useState(storedUserDetails.city);
  const [state, setState] = useState(storedUserDetails.state);
  const [country, setCountry] = useState(storedUserDetails.country);
  const [notes, setNotes] = useState(storedUserDetails.notes);

  const handleOnChange = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'address1':
        setAddress1(e.target.value);
        break;
      case 'address2':
        setAddress2(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'state':
        setState(e.target.value);
        break;
      case 'country':
        setCountry(e.target.value);
        break;
      case 'notes':
        setNotes(e.target.value);
        break;
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            email={email}
            address1={address1}
            address2={address2}
            city={city}
            state={state}
            country={country}
            notes={notes}
            onChange={handleOnChange}
          />
        );
      case 1:
        return (
          <Review
            email={email}
            address1={address1}
            address2={address2}
            city={city}
            state={state}
            country={country}
            notes={notes}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const isDisabled = Boolean(cartLength === 0 || !email || !address1 || !city || !state || !country);

  const handleSubmit = async () => {
    const userDetails = {
      email,
      address1,
      address2,
      city,
      state,
      country,
      notes,
    };
    const response = await createOrder(axios, cartItems, userDetails);
    dispatch(updateUser(userDetails));
    window.location.href = response;
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Fragment>
      <CssBaseline />
      {/* <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            ShopX
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                You will be redirected to process your payment. We have emailed, and will send you an update when your
                order has processed.
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  disabled={isDisabled}
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
              {cartLength === 0 && <Typography variant="caption">*Your cart is empty</Typography>}
            </Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </Fragment>
  );
}
