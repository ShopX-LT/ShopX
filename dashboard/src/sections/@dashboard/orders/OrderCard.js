import React, { useState, useEffect } from 'react';
import { IconButton, Button, styled, TableCell, TableRow } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { OrderDetails } from '.';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import PillDropdownButton from '../../../components/button/DropdownPillButton';
import Drawer from '../../../components/drawer';

const OrderCard = ({ order, updateFunction, setUpdatedOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dateOrdered = fDate(order.dateOrdered);

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <Button variant="contained" aria-label="view order" size="small" onClick={handleOpenDrawer}>
            View order
          </Button>
        </TableCell>
        <TableCell align="left">{dateOrdered}</TableCell>
        <TableCell component="th" scope="row">
          {order.orderedBy}
        </TableCell>
        <TableCell align="left">{fCurrency(order.total)}</TableCell>
        <TableCell align="left">
          <PillDropdownButton order={order} updateFunction={updateFunction} setUpdatedOrder={setUpdatedOrder} />
        </TableCell>
      </TableRow>
      {/* Side Panel */}
      <Drawer title="Order Details" openDrawer={openDrawer} onCloseDrawer={handleCloseDrawer} width={375}>
        <OrderDetails
          open={isOpen}
          order={order}
          statusButton={
            <PillDropdownButton order={order} updateFunction={updateFunction} setUpdatedOrder={setUpdatedOrder} />
          }
        />
      </Drawer>
    </>
  );
};

export default OrderCard;
