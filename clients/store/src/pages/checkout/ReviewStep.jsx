import React, { Fragment } from 'react';
import { List, ListItem, ListItemText, Grid, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { fCurrency } from '../../utils/formatNumber';
import useStore from '../../hooks/useStore';

export default function Review({ email, address1, address2, city, state, country, notes }) {
  const { store } = useStore();
  const cartItems = useSelector((state) => state.cart.cart);
  const cartTotal = useSelector((state) => state.cart.total);
  const deleveryFee = 1500;
  const serviceFee = cartTotal * 0.05;
  const total = cartTotal + serviceFee + deleveryFee;
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cartItems.map((item) => {
          if (item.store === store) {
            return (
              <ListItem key={item.itemId} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={item.title} secondary={`x${item.quantity}`} />
                <Typography variant="body2">{fCurrency(item.price)}</Typography>
              </ListItem>
            );
          }
          return null;
        })}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Delivery" />
          <Typography variant="body2">{fCurrency(deleveryFee)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Service Fee" />
          <Typography variant="body2">{fCurrency(serviceFee)}</Typography>
        </ListItem>
        <Divider />
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {fCurrency(total)}
          </Typography>
        </ListItem>
        <Divider />
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{email}</Typography>
          <Typography gutterBottom>
            {address1}, {address2},
          </Typography>
          <Typography gutterBottom>
            {city}, {state}, {country}
          </Typography>
          <Typography gutterBottom>{notes}</Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
}
