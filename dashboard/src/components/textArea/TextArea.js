import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { TextareaAutosize, Typography } from '@mui/material';

const StyledTextarea = styled(TextareaAutosize)(
  () => `
            font-family: IBM Plex Sans, sans-serif;
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 12px;
            border-radius: 12px 12px 0 12px;
            border: 1px solid grey;
          `
);

const TextArea = ({ minRows = 4, name, onChange, value, placeholder, label, onBlur, tips }) => (
  <>
    <StyledTextarea
      label={label}
      minRows={minRows}
      name={name}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      style={{ width: '100%' }}
    />
    <Typography variant="caption" sx={{ marginTop: -1 }}>
      {tips}
    </Typography>
  </>
);

export default TextArea;

// ----------------------------------------------------------------------

TextArea.propTypes = {
  minRows: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
};
