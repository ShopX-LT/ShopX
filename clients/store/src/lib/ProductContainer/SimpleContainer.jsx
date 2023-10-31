import React from 'react';
import { Box, Card, Stack, Link, Typography, styled, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fCurrency } from '../../utils/formatNumber';
import ActionButton from '../button/ActionButton';
import GeneralButton from '../button/GeneralButton';
import useCart from '../../sections/cart/hooks/useCart';
import { useSelector } from 'react-redux';
import Label from '../label';
import useStore from '../../hooks/useStore';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  // top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  // position: 'absolute',
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
  const { store } = useStore();
  const { title, imagesUrl, price, discount, quantity } = product;
  const priceSale = discount === 0 ? 0 : price * (1 - discount / 100);
  const priceAtferDiscount = price * (1 - discount / 100);
  const { handleAddToCart } = useCart();
  const containerDesign = useSelector((state) => state.webDesign.productContainer);

  const handleOnClick = () => {
    handleAddToCart({
      id: product.id,
      title: title,
      discountedPrice: priceAtferDiscount,
      availableQuantity: quantity,
      store: store,
    });
  };

  return (
    <Card sx={{ background: containerDesign.productBackgroundColor }}>
      <Box sx={{ position: 'relative' }}>
        {quantity < 5 && (
          <Label
            variant="soft"
            color={'error'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Only {quantity} left
          </Label>
        )}
      </Box>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Carousel navButtonsAlwaysVisible={true} sx={{ position: 'absolute', width: '100%', height: '100%', top: 0 }}>
          {imagesUrl.map((imageUrl, index) => {
            return <StyledProductImg key={index} alt={title} src={imageUrl} />;
          })}
        </Carousel>
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
          <Typography variant="subtitle1" sx={{ color: containerDesign.productMainTextColor }}>
            {product.title}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="start">
            <Typography
              variant="subtitle1"
              sx={{
                color: `${priceSale > 0 ? containerDesign.productSubTextColor : null}`,
                textDecoration: `${priceSale > 0 ? 'line-through' : 'none'}`,
              }}
            >
              {fCurrency(price)}
            </Typography>
            {priceSale > 0 ? (
              <Typography variant="subtitle1" sx={{ color: containerDesign.productMainTextColor }}>
                &nbsp;{fCurrency(priceSale)}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
        <Box px={1}>
          <GeneralButton
            aria-label="Add to cart"
            buttonstyle={'action'}
            textColor={containerDesign.productActionButtonTextColor}
            bgColor={containerDesign.productActionButtonColor}
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
