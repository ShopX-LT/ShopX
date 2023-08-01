import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const SubHeading = ({ textColor, text, weight, bgColor, ...rest }) => {
  return (
    <div>
      <Typography variant="h6" fontWeight={weight} sx={{ color: textColor }} {...rest}>
        {text}
      </Typography>
    </div>
  );
};

SubHeading.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  weight: PropTypes.string,
};

export default SubHeading;
