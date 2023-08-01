import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import ActionButton from './ActionButton';

const renderButton = () => {};

const GeneralButton = (props) => {
  switch (props.style) {
    case 'action':
      return <ActionButton props={props} />;
    default:
  }
};
GeneralButton.propTypes = {
  style: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.string,
};

export default GeneralButton;
