import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const SelectStoreNameForm = ({ storeName, product, isStoreNameValid, brandColor, onChange, checkStoreName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isNameChecked, setIsNameChecked] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);
    const res = await checkStoreName();
    setIsLoading(false);
    setIsNameChecked(true);
  };

  return (
    <Box>
      <Box>
        <List dense>
          <ListItem disableGutters>
            <ListItemText secondary="Your store name should be in lowercase" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText secondary="Use only letters, numbers, hyphens(-), apostrophes(') or @" />
          </ListItem>
        </List>
      </Box>
      <Grid container spacing={3}>
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
          ) : isNameChecked ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption">This name is taken</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption">Click the Check to see if your name is taken</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleOnClick}>
            Check
          </Button>
          {isLoading && (
            <Box sx={{ display: 'flex', px: 2, py: 1 }}>
              <CircularProgress size={30} thickness={4} />
            </Box>
          )}
        </Grid>

        <Grid item xs={9}>
          <TextField
            id="brandColor"
            name="brandColor"
            InputProps={{
              readOnly: true,
            }}
            label="Select your brand color"
            fullWidth
            variant="standard"
            value={brandColor}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
          <input
            type="color"
            className="colorPicker"
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
