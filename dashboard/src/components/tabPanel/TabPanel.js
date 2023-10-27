import { Box } from '@mui/material';
import React from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`frontpage-tabpanel-${index}`}
      aria-labelledby={`frontpage-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && <Box sx={{ px: 3 }}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
