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

const AccountDetails = ({ accountType, email, password, verifyPassword, onChange, onAccountTypeChange }) => {
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

      <FormControl>
        <RadioGroup
          aria-label="account type"
          id="accountType"
          name="accountType"
          value={accountType}
          onChange={onAccountTypeChange}
        >
          <FormControlLabel
            value="old"
            control={<Radio />}
            label="I already have store with ShopX registered to this email address"
          />
          <FormControlLabel
            value="new"
            control={<Radio />}
            size="small"
            label="This is my first time creating a store with ShopX using this email address"
          />
        </RadioGroup>
      </FormControl>
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
        {accountType === 'new' && (
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
        )}
      </Grid>
    </Box>
  );
};

export default AccountDetails;
