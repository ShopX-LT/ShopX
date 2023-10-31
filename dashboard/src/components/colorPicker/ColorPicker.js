import React from 'react';
import { Grid, TextField } from '@mui/material';

const ColorPicker = ({ id, name, label, onChange, value }) => {
  return (
    <>
      <Grid item xs={9}>
        <TextField id={id} name={name} disabled label={label} onChange={onChange} value={value} variant="standard" />
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
        <input
          type="color"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          style={{ cursor: 'pointer', width: '100%' }}
        />
      </Grid>
    </>
  );
};

export default ColorPicker;
