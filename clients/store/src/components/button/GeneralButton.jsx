import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';

const renderButton = (props) => {
  switch (props.buttonstyle) {
    case 'action':
      return <ActionButton {...props} />;
    default:
  }
};

const GeneralButton = (props) => {
  return <div>{renderButton(props)}</div>;
};
GeneralButton.propTypes = {
  buttonstyle: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.string,
};

export default GeneralButton;
