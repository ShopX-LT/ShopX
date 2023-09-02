import React from 'react';
import * as _ from 'lodash';
import { AppBar, Button, Box, IconButton, Toolbar, Typography, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import useDesign from '../../../sections/@dashboard/design/hooks/useDesign';

export default function LegacyNav({ design }) {
  //   const { design } = useDesign();
  return (
    <Box sx={{ flexGrow: 1, width: '375px' }}>
      <AppBar position="static" sx={{ background: design.navBackgroundColor, color: design.navTextColor }}>
        <Toolbar>
          <MenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
            {_.upperCase('store')}
          </Typography>
          <ShoppingBagIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
