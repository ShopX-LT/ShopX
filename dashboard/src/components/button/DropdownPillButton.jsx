import React, { useState } from 'react';
import _ from 'lodash';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const OPTIONS = {
  cancelled: { name: 'cancelled', color: 'error' },
  pending: { name: 'pending', color: 'warning' },
  delivered: { name: 'delivered', color: 'success' },
  ready: { name: 'ready', color: 'info' },
  inTransit: { name: 'in transit', color: 'primary' },
};

const StyledButton = styled(Button)(() => ({
  borderRadius: '50px',
}));

const PillDropdownButton = ({ status }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(status || 'pending');

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
