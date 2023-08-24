import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

const Heading = ({ textColor, text, weight = '500', bgColor, ...rest }) => {
  return (
    <div>
      <Typography variant="h2" fontWeight={weight} sx={{ color: textColor }} {...rest}>
        {text}
      </Typography>
    </div>
  );
};

Heading.propTypes = {
  bgColor: PropTypes.string,
  text: PropTypes.string,
  textColor: PropTypes.string,
  weight: PropTypes.string,
};

export default Heading;
