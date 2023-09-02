import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralButton from '../components/button/GeneralButton';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cart/cartSlice';
import useAxiosWithStore from '../api/apiHooks/useAxiosWithStore';
import { verifyPayment } from '../services/checkoutService';

const SuccessPage = () => {
  const axios = useAxiosWithStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstRender, setFirstRender] = useState(true);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const transactionRef = urlSearchParams.get('trxref');
  useEffect(() => {
    const callVerifyPayment = async () => {
      try {
        // Make the backend call only if it hasn't been made before
        const response = await verifyPayment(axios, transactionRef);
        console.log('response');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    callVerifyPayment();
  }, []);
  dispatch(clearCart());
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3">Thank you for shopping with ShopX!</Typography>
        <GeneralButton buttonstyle={'action'} onClick={() => navigate('/home')}>
          Continue Shopping!
        </GeneralButton>
      </Box>
    </Box>
  );
};

export default SuccessPage;
