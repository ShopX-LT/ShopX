import React from 'react';
import { styled } from '@mui/system';
import {
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
            font-family: IBM Plex Sans, sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 12px;
            border-radius: 12px 12px 0 12px;
            border: 1px solid grey;
          `
);

const TextArea = ({ minRows = 4, name, onChange, value, placeholder }) => {
  return (
    <>
      <StyledTextarea
        minRows={minRows}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        style={{ width: '100%' }}
      />
    </>
  );
};

export default TextArea;
