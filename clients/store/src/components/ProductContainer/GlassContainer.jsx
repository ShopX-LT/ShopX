import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import ActionButton from '../button/ActionButton';
import SubHeading from '../text/SubHeading';
import { fCurrency } from '../../utils/formatNumber';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  borderRadius: '8px',
});

const StyledItemDetails = styled('div')({
  backdropFilter: 'blur(16px) saturate(180%)',
  backgroundColor: 'rgba(245, 245, 245, 0.9)',
  borderRadius: '5px',
  border: '1px solid rgba(0, 0, 0, 0.5)',
  padding: 4,
  marginBottom: 4,
});

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

const GlassContainer = ({ product }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ pt: '100%', position: 'relative', borderRadius: '8px', boxShadow: 3 }}>
        <StyledProductImg src={mockProduct.imagesUrl[0]} alt="test item" />
        <Box sx={{ padding: 1 }}>
          <StyledItemDetails>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <SubHeading text={mockProduct.title} textColor={mock.mainTextColor} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'end' }}>
                <Typography
                  variant="caption"
                  sx={{
                    flex: 1,
                    color: `${mockProduct.priceSale > 0 ? mock.subTextColor : null}`,
                    textDecoration: `${mockProduct.priceSale > 0 ? 'line-through' : 'none'}`,
                  }}
                >
                  {fCurrency(mockProduct.price)}
                </Typography>
                {mockProduct.priceSale > 0 ? (
                  <Typography variant="body1" sx={{ color: mock.mainTextColor, flex: 2, fontWeight: '500' }}>
                    &nbsp;{fCurrency(mockProduct.priceSale)}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </StyledItemDetails>
        </Box>
      </Box>
      <Box my={1} mx={1}>
        <ActionButton text={mock.actionButtonText} width={'100%'} />
      </Box>
    </Box>
  );
};

export default GlassContainer;
