import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { updateOrder } from '../../services/OrderService';

const OPTIONS = {
  cancelled: { name: 'cancelled', color: 'warning' },
  pending: { name: 'pending', color: 'error' },
  delivered: { name: 'delivered', color: 'success' },
  ready: { name: 'ready', color: 'info' },
  inTransit: { name: 'in transit', color: 'primary' },
};

const StyledButton = styled(Button)(() => ({
  borderRadius: '50px',
}));

const PillDropdownButton = ({ order, status }) => {
  const axiosPrivate = useAxiosPrivate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(status || 'pending');

  // FIX: useEffect should be moved higher up. If it is here the page will run the useEffect for the number of orders in the store because pillbutton will be created for each.
  useEffect(() => {
    const updateStatus = async () => {
      const updatedOrder = { ...order, status: selected };
      const response = await updateOrder(axiosPrivate, order.id, updatedOrder);
      if (!response) {
        return;
      }
      console.log(order);
    };
    updateStatus();
  }, [selected]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, item) => {
    setSelected(item);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton
        variant="contained"
        color={OPTIONS[selected].color}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {_.capitalize(OPTIONS[selected].name)}
      </StyledButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {_.map(OPTIONS, (value, key) => {
          return (
            <MenuItem key={key} onClick={(event) => handleMenuItemClick(event, key)}>
              {_.capitalize(value.name)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default PillDropdownButton;
