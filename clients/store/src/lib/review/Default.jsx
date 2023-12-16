import { Box, Rating, Typography } from '@mui/material';
import React from 'react';

const Default = ({ name, comment, rating, date }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'start',
          borderBottom: '1px',
          borderColor: 'Divider',
        }}
        marginBottom={4}
      >
        <Typography variant="h6">{name}</Typography>
        <Rating name="item rating" defaultValue={rating || 0} precision={0.5} readOnly />
        <Typography variant="body1">{comment}</Typography>
      </Box>
    </div>
  );
};

export default Default;
