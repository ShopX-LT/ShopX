import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Body = ({ textColor, text, weight, bgColor, ...rest }) => {
  return (
    <div>
      <Typography variant="body1" fontWeight={weight} sx={{ color: textColor }} {...rest}>
        {text}
      </Typography>
    </div>
  );
};

Body.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  weight: PropTypes.string,
};

export default Body;
