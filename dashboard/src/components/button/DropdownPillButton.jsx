import React, { useState, useEffect } from 'react';
import { capitalize, map } from 'lodash';
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
  width: '120px',
}));

const PillDropdownButton = ({ order, updateFunction, setUpdatedOrder }) => {
  const axiosPrivate = useAxiosPrivate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(order.status);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, item) => {
    order.status = item;
    setUpdatedOrder(order);
    updateFunction();
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
        {capitalize(OPTIONS[selected].name)}
      </StyledButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {map(OPTIONS, (value, key) => {
          return (
            <MenuItem key={key} onClick={(event) => handleMenuItemClick(event, key)}>
              {capitalize(value.name)}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default PillDropdownButton;
