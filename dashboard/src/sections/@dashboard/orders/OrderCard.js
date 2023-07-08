import React, { useState, useEffect } from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
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

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleOpenFilter}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
      <Drawer title="Order Details" openFilter={openFilter} onCloseFilter={handleCloseFilter} width={400}>
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
