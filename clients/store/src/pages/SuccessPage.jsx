import { Box, Button, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralButton from '../lib/button/GeneralButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/cart/cartSlice';
import useAxiosWithStore from '../api/apiHooks/useAxiosWithStore';
import { verifyPayment } from '../services/checkoutService';
import useStore from '../hooks/useStore';

const SuccessPage = () => {
  const { store } = useStore();
  const axios = useAxiosWithStore();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstRender = useRef(false);
  const heroDesign = useSelector((state) => state.webDesign.hero);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const transactionRef = urlSearchParams.get('trxref');

  const callVerifyPayment = useCallback(async () => {
    try {
      await verifyPayment(axios, transactionRef);
      const { store } = useStore(store);
      dispatch(clearCart());
    } catch (error) {
      // console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;

    callVerifyPayment();
  }, []);
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
        <Typography variant="h3" sx={{ color: heroDesign.heroHeadlineColor }}>
          Thank you for shopping with ShopX!
        </Typography>
        <GeneralButton
          buttonstyle={'action'}
          onClick={() => navigate('/home')}
          sx={{ background: heroDesign.heroActionButtonColor, color: heroDesign.heroActionButtonTextColor }}
        >
          Continue Shopping!
        </GeneralButton>
      </Box>
    </Box>
  );
};

export default SuccessPage;
