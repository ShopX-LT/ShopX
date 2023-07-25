import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

ActionButton.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  hover: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  width: PropTypes.string,
};

const ActionButton = ({ bgColor = 'primary', text, textColor, children, hover = false, width, onClick }) => {
  return (
    <div>
      <Button
        variant="contained"
        size="medium"
        onClick={onClick}
        sx={{
          background: bgColor,
          color: textColor,
          width: width,
          ...(hover && {
            '&:hover': {
              background: textColor,
              color: bgColor,
            },
          }),
        }}
      >
        {text} {children}
      </Button>
    </div>
  );
};

export default ActionButton;
