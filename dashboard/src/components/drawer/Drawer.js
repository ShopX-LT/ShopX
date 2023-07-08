import React from 'react';
// @mui
import { Box, Radio, Stack, Button, Drawer as MuiDrawer, Divider, IconButton, Typography } from '@mui/material';

import Iconify from '../iconify';
import Scrollbar from '../scrollbar';

const Drawer = ({ openFilter, onOpenFilter, onCloseFilter, width = 280, title, children }) => {
  return (
    <MuiDrawer
      anchor="right"
      open={openFilter}
      onClose={onCloseFilter}
      PaperProps={{
        sx: { width: { width }, border: 'none', overflow: 'hidden' },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          {title}
        </Typography>
        <IconButton onClick={onCloseFilter}>
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </Stack>
      <Divider />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {children}
        </Stack>
      </Scrollbar>
    </MuiDrawer>
  );
};

export default Drawer;
