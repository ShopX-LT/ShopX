import React from 'react';
import {
  Box,
  Collapse,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';

const orderDetails = ({ order, statusButton }) => {
  const { itemsOrdered: items, orderedBy, subTotal, deliveryFee, deliveryAddress, total, dateOrdered } = order;
  return (
    <>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Date ordered
        </Typography>
        <Box sx={{ px: 1 }}>
          <Typography variant="main" gutterBottom>
            {fDate(dateOrdered)}
          </Typography>
        </Box>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Customer Details
        </Typography>
        <Box sx={{ px: 1 }}>
          <Typography variant="main" gutterBottom>
            {orderedBy}
          </Typography>
        </Box>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Address
        </Typography>
        <Box sx={{ px: 1 }}>
          <Typography variant="main" gutterBottom>
            {deliveryAddress?.address1} <br />
            {deliveryAddress?.address2} <br />
            {deliveryAddress?.city}, {deliveryAddress?.state} <br />
          </Typography>
        </Box>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Notes
        </Typography>
        <Typography variant="main" gutterBottom sx={{ px: 1 }}>
          {deliveryAddress?.notes}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" gutterBottom>
          Purchases
        </Typography>
        {items.map((item) => (
          <Stack key={item._id} direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1 }}>
            <Typography variant="main" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              x{item.quantity}
            </Typography>
            <Typography variant="main" gutterBottom>
              {fCurrency(item.paid * (1 - item.discount / 100) * item.quantity)}
            </Typography>
          </Stack>
        ))}
      </div>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1 }}>
        <Typography variant="main">Subtotal</Typography>
        <Typography variant="main" sx={{ px: 1 }}>
          {fCurrency(subTotal)}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1 }}>
        <Typography variant="main">Delivery Fee</Typography>
        <Typography variant="main" sx={{ px: 1 }}>
          {fCurrency(deliveryFee)}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1 }}>
        <Typography variant="main">Total</Typography>
        <Typography variant="main" sx={{ px: 1 }}>
          {fCurrency(total)}
        </Typography>
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{statusButton}</Box>
    </>
  );
};

export default orderDetails;
