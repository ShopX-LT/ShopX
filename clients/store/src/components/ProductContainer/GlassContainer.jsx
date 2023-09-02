import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import ActionButton from '../button/ActionButton';
import SubHeading from '../text/SubHeading';
import { fCurrency } from '../../utils/formatNumber';
import GeneralButton from '../button/GeneralButton';

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

const GlassContainer = ({ product }) => {
  const { title, imagesUrl, price, discount, quantity } = product;
  const priceSale = discount === 0 ? 0 : price * (1 - discount / 100);
  const priceAtferDiscount = price * (1 - discount / 100);
  const { handleAddToCart } = useCart();
  const containerDesign = useSelector((state) => state.webDesign.productContainer);

  const handleOnClick = () => {
    handleAddToCart({ id: product.id, title: title, discountedPrice: priceAtferDiscount, availableQuantity: quantity });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ pt: '100%', position: 'relative', borderRadius: '8px', boxShadow: 3 }}>
        <StyledProductImg src={imagesUrl[0]} alt="test item" />
        <Box sx={{ padding: 1 }}>
          <StyledItemDetails>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ flex: 1 }}>
                <SubHeading text={title} textColor={containerDesign.productMainTextColor} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'end' }}>
                <Typography
                  variant="caption"
                  sx={{
                    flex: 1,
                    color: `${priceSale > 0 ? containerDesign.productSubTextColor : null}`,
                    textDecoration: `${priceSale > 0 ? 'line-through' : 'none'}`,
                  }}
                >
                  {fCurrency(price)}
                </Typography>
                {priceSale > 0 ? (
                  <Typography
                    variant="body1"
                    sx={{ color: containerDesign.productMainTextColor, flex: 2, fontWeight: '500' }}
                  >
                    &nbsp;{fCurrency(priceSale)}
                  </Typography>
                ) : null}
              </Box>
            </Box>
          </StyledItemDetails>
        </Box>
      </Box>
      <Box my={1} mx={1}>
        <GeneralButton
          aria-label="Add to cart"
          buttonstyle={'action'}
          textColor={containerDesign.actionButtonTextColor}
          bgColor={containerDesign.actionButtonColor}
          onClick={handleOnClick}
          width={'100%'}
        >
          ADD TO CART
        </GeneralButton>
      </Box>
    </Box>
  );
};

export default GlassContainer;
