import { Box, Icon, Typography } from '@mui/material';
import React from 'react';

const Card = ({ icon, title, body }) => {
  return (
    <Box
      sx={{
        boxShadow: '0 2px 10px 0 rgba( 31, 138, 38, 0.37 )',
        backdropFilter: 'blur( 6.5px )',
        borderRadius: '10px',
        border: '1px solid rgba( 255, 255, 255, 0.18 )',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        color: 'white',
        height: '100%',
      }}
    >
      {icon}

      <Typography mt={2} variant="h6">
        {title}
      </Typography>
      <Typography variant="body2">{body}</Typography>
    </Box>
  );
};

export default Card;
