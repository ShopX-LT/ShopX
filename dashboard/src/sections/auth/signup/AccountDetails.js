import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

const AccountDetails = ({ email, password, verifyPassword, onChange }) => {
  const checkPasswords = () => {
    if (!password || !verifyPassword || password !== verifyPassword) {
      return true;
    }
    return false;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Account Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Enter your email address"
            fullWidth
            variant="standard"
            type="email"
            value={email}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            onChange={onChange}
            variant="standard"
            value={password}
            type="password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="verifyPassword"
            required
            name="verifyPassword"
            label="Verify password"
            fullWidth
            onChange={(e) => {
              onChange(e);
              checkPasswords();
            }}
            variant="standard"
            value={verifyPassword}
            error={checkPasswords()}
            type="password"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountDetails;
