import React from 'react';
import { Box, Card, Stack, Link, Typography, styled } from '@mui/material';
import { fCurrency } from '../../utils/formatNumber';
import ActionButton from '../button/ActionButton';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

const mockProduct = {
  title: 'Testitem Title',
  imagesUrl: [
    'https://images.unsplash.com/photo-1609873814058-a8928924184a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
  ],
  price: 10000,
  priceSale: 9000,
  // work out price sale later
};

const mock = {
  backgroundColor: 'white',
  mainTextColor: 'black',
  subTextColor: 'grey',
  actionButtonStyle: '',
  actionButtonText: 'ADD TO CART',
  actionButtonColor: 'black',
  actionButtonTextColor: 'white',
};

const SimpleContainer = ({ product }) => {
  return (
    <Card sx={{ background: mock.backgroundColor }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={mockProduct.title} src={mockProduct.imagesUrl[0]} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="subtitle2" sx={{ color: mock.mainTextColor }} noWrap>
          {mockProduct.title}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="start">
          <Typography
            variant="subtitle1"
            sx={{
              color: `${mockProduct.priceSale > 0 ? mock.subTextColor : null}`,
              textDecoration: `${mockProduct.priceSale > 0 ? 'line-through' : 'none'}`,
            }}
          >
            {fCurrency(mockProduct.price)}
          </Typography>
          {mockProduct.priceSale > 0 ? (
            <Typography variant="subtitle1" sx={{ color: mock.mainTextColor }}>
              &nbsp;{fCurrency(mockProduct.priceSale)}
            </Typography>
          ) : null}
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <ActionButton
            text={mock.actionButtonText}
            textColor={mock.actionButtonTextColor}
            bgColor={mock.actionButtonColor}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default SimpleContainer;
