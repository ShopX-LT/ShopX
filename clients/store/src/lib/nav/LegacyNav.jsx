import React, { useState } from 'react';
import * as _ from 'lodash';
import { AppBar, Button, Box, IconButton, Toolbar, Typography, Container, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import NavItemDrawer from './NavItemDrawer';
import CartPanel from './CartPanel';
import { useSelector } from 'react-redux';
import useStore from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

export default function LegacyNav() {
  const { store } = useStore();
  const navigate = useNavigate();
  const navDesign = useSelector((state) => state.webDesign.nav);
  const cartItems = useSelector((state) => state.cart.cart);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: navDesign.navBackgroundColor, color: navDesign.navTextColor }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsNavOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => {
              navigate('/home');
            }}
          >
            {_.upperCase(store)}
          </Typography>
          <IconButton color="inherit" aria-label="open cart" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <CartPanel isOpen={isCartOpen} openCart={() => setIsCartOpen(true)} closeCart={() => setIsCartOpen(false)} />

      <NavItemDrawer isOpen={isNavOpen} openNav={() => setIsNavOpen(true)} closeNav={() => setIsNavOpen(false)} />
    </Box>
  );
}
