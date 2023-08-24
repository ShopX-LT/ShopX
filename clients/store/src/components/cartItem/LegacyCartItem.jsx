import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { fCurrency } from '../../utils/formatNumber';
import useCart from '../../sections/cart/hooks/useCart';
import { CartItemContainer, CounterContainer, Details, DetailsContainer, Title } from './style';

const LegacyCartItem = ({ item }) => {
  const { increaseCount, decreaseCount } = useCart();
  return (
    <div>
      <CartItemContainer paddingLeft={2}>
        <DetailsContainer p={1}>
          {/* image */}
          {/* <Box sx={{ border: '1px purple solid', width: '100px' }}></Box> */}
          <Details>
            <Box>
              <Title variant="subtitle1">{item.title}</Title>
              <Typography variant="subtitle1">{fCurrency(item.price)}</Typography>
            </Box>

            <CounterContainer>
              <IconButton
                aria-label={`decrease ${item.title} item quantity by 1`}
                onClick={() => decreaseCount(item.itemId)}
              >
                <RemoveCircleIcon />
              </IconButton>
              <Typography variant="subtitle1">{item.quantity}</Typography>
              <IconButton
                aria-label={`increase ${item.title} item quantity by 1`}
                color="primary"
                onClick={() => increaseCount(item.itemId)}
              >
                <AddCircleIcon />
              </IconButton>
            </CounterContainer>
          </Details>
        </DetailsContainer>
        {/* Remove Button */}
        {/* <IconButton color="error">
          <HighlightOffIcon />
        </IconButton> */}
      </CartItemContainer>
    </div>
  );
};

export default LegacyCartItem;
