import React from 'react';
import { Box, Card, Stack, Link, Typography, styled, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fCurrency } from '../../utils/formatNumber';
import ActionButton from '../button/ActionButton';
import GeneralButton from '../button/GeneralButton';
import useCart from '../../sections/cart/hooks/useCart';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

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
  const { title, imagesUrl, price, discount, quantity } = product;
  const priceSale = discount === 0 ? 0 : price * (1 - discount / 100);
  const priceAtferDiscount = price * (1 - discount / 100);
  const { handleAddToCart } = useCart();
  const containerDesign = useSelector((state) => state.webDesign.productContainer);

  const handleOnClick = () => {
    handleAddToCart({ id: product.id, title: title, discountedPrice: priceAtferDiscount });
  };

  return (
    <Card sx={{ background: containerDesign.backgroundColor }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={title} src={imagesUrl[0]} />
      </Box>
      <Stack spacing={2} direction="row" alignItems={'center'} justifyContent={'space-between'}>
        <Stack
          sx={{
            p: 1,
            flexGrow: 1,
            flexBasis: 'auto',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography variant="subtitle1" sx={{ color: containerDesign.mainTextColor }}>
            {product.title}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="start">
            <Typography
              variant="subtitle1"
              sx={{
                color: `${priceSale > 0 ? containerDesign.subTextColor : null}`,
                textDecoration: `${priceSale > 0 ? 'line-through' : 'none'}`,
              }}
            >
              {fCurrency(price)}
            </Typography>
            {priceSale > 0 ? (
              <Typography variant="subtitle1" sx={{ color: containerDesign.mainTextColor }}>
                &nbsp;{fCurrency(priceSale)}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
        <Box px={1}>
          <GeneralButton
            aria-label="Add to cart"
            buttonstyle={'action'}
            textColor={containerDesign.actionButtonTextColor}
            bgColor={containerDesign.actionButtonColor}
            onClick={handleOnClick}
            p={1}
          >
            BUY
          </GeneralButton>
        </Box>
      </Stack>
    </Card>
  );
};

export default SimpleContainer;
