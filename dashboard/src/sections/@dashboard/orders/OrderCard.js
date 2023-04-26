import React, { useState } from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OrderDetails } from '.';
import { fDate } from '../../../utils/formatTime';

const OrderCard = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dateOrdered = fDate(order.dateOrdered);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{dateOrdered}</TableCell>
        <TableCell component="th" scope="row">
          {order.orderedBy}
        </TableCell>
        <TableCell align="left">{order.total}</TableCell>
        <TableCell align="left">{order.status.toUpperCase()}</TableCell>
      </TableRow>
      {/* COLLAPSE */}
      <OrderDetails
        open={isOpen}
        items={order.itemsOrdered}
        subTotal={order.subTotal}
        deliveryFee={order.deliveryFee}
      />
    </>
  );
};

export default OrderCard;