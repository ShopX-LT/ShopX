import React from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LegacyCartItem from '../cartItem/LegacyCartItem';
import { fCurrency } from '../../utils/formatNumber';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/useStore';

const CartPanel = ({ isOpen, openCart, closeCart }) => {
  const { store } = useStore();
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotal = useSelector((state) => state.cart.total);
  const navigate = useNavigate();
  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={closeCart}
        onOpen={openCart}
        PaperProps={{
          sx: { width: 300, border: 'none', overflow: 'scroll', background: '#313131', color: '#e1e1e1' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <IconButton onClick={closeCart}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" mx={4} sx={{ flex: 1 }} align="center">
            Your Cart
          </Typography>
        </Box>
        <Divider />
        {cartItems.map((item) => {
          if (item.store === store) {
            return (
              <div key={item.itemId}>
                <LegacyCartItem item={item} />
              </div>
            );
          }
          return null;
        })}
        <Box px={2} py={2} sx={{ marginTop: 'auto' }}>
          {/* @TODO: Make this a component */}
          <Box mb={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">{cartTotal ? fCurrency(cartTotal) : `₦ 0.00`}</Typography>
          </Box>
          <Button
            mb={4}
            variant="contained"
            sx={{ background: 'black' }}
            fullWidth
            onClick={() => {
              if (cartTotal > 0) {
                closeCart();
                navigate('/checkout');
              }
            }}
          >
            Checkout
          </Button>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default CartPanel;
