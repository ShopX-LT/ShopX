import React from 'react';
import { FormControlLabel, Radio, RadioGroup, Box, Paper, Typography } from '@mui/material';

const ImageRadio = ({ image, label, value, selectedValue, handleChange }) => {
  return (
    <FormControlLabel
      labelPlacement="top"
      value={value}
      control={<Radio checked={value === selectedValue} onChange={handleChange} />}
      label={
        <Box display="flex" alignItems="center">
          <img src={image} alt={label} width={320} height={180} style={{ borderRadius: '5px' }} />
          {/* <Typography>{label}</Typography> */}
        </Box>
      }
    />
  );
};

export default ImageRadio;
