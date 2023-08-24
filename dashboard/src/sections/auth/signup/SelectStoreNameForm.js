import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Grid, CircularProgress } from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const SelectStoreNameForm = ({ storeName, product, isStoreNameValid, brandColor, onChange, checkStoreName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    const res = await checkStoreName();
    setIsLoading(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select your store name
      </Typography>
      <Typography variant="caption">* Your store name should be in lowercase</Typography>
      <br />
      <Typography variant="caption">* Hyphens(-) and apostrophes(') are allowed</Typography>
      <br />
      <Typography variant="caption">* Click the Check to see if your name is taken</Typography>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={9}>
          <TextField
            required
            id="storeName"
            name="storeName"
            label="Store name"
            fullWidth
            variant="standard"
            value={storeName}
            onChange={onChange}
          />
          {isStoreNameValid ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ThumbUpAltIcon color="success" /> <Typography variant="caption">Your store name is available</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption">This name is taken</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleOnClick}>
            Check
          </Button>
        </Grid>
        {isLoading && (
          <Box sx={{ display: 'flex', px: 2, py: 1 }}>
            <CircularProgress size={30} thickness={4} />
          </Box>
        )}

        <Grid item xs={9}>
          {
            <TextField
              id="brandColor"
              name="brandColor"
              disabled
              label="Select your brand color"
              fullWidth
              variant="standard"
              value={brandColor}
              onChange={onChange}
            />
          }
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
          <input
            type="color"
            id="brandColor"
            name="brandColor"
            value={brandColor}
            onChange={onChange}
            style={{ width: '100%' }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="product"
            name="product"
            label="What will you be selling?"
            fullWidth
            variant="standard"
            value={product}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectStoreNameForm;
