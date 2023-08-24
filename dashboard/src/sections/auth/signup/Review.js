import { Box, Typography } from '@mui/material';
import React from 'react';

const Review = ({ storeUrl }) => {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Congratulations! Your store has been created.
      </Typography>
      <Typography variant="subtitle1" fontWeight={400} mb={1}>
        - Click the next button to login to your admin panel.
      </Typography>
      <Typography variant="subtitle1" fontWeight={400}>
        - You will be able to manage your inventory, orders, payments and your website from the admin panel.
      </Typography>
      <Typography variant="subtitle1" mt={2}>
        You website url is:
      </Typography>
      <Typography variant="body1">
        <a href={storeUrl} target="blank">
          {storeUrl}
        </a>
      </Typography>
    </Box>
  );
};

export default Review;
