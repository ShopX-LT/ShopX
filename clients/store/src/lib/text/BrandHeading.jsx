import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const BrandHeading = ({
  textColor,
  text,
  weight = '500',
  xsTextFontSize = '36px',
  smTextFontSize = '48px',
  bgColor,
  ...rest
}) => {
  return (
    <div>
      <Typography
        variant="h1"
        fontWeight={weight}
        sx={{ color: textColor, fontSize: { xs: `${xsTextFontSize} !important`, sm: `${smTextFontSize} !important` } }}
        {...rest}
      >
        {text}
      </Typography>
    </div>
  );
};

BrandHeading.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  weight: PropTypes.string,
};

export default BrandHeading;
