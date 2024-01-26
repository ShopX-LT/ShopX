import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { ButtonStyle } from './styles';

const ActionButton = ({
  bgColor = 'primary',
  size = 'medium',
  text,
  textColor,
  children,
  hover = false,
  width,
  onClick,
  ...rest
}) => {
  return (
    <div>
      <ButtonStyle
        variant="contained"
        size={size}
        onClick={onClick}
        design={{ bgColor, text, textColor, children, hover, width }}
        {...rest}
      >
        {text} {children}
      </ButtonStyle>
    </div>
  );
};

ActionButton.propTypes = {
  buttonstyle: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.string,
};

export default ActionButton;
