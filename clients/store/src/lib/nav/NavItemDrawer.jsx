import React from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import { useNavigate } from 'react-router-dom';

const NavItemDrawer = ({ isOpen, openNav, closeNav }) => {
  const navigate = useNavigate();
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <HomeIcon />,
      onClick: () => {
        navigate('/home');
      },
    },
    {
      id: 'products',
      label: 'Products',
      icon: <SellIcon />,
      onClick: () => {
        navigate('/products');
      },
    },
  ];

  return (
    <div>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={closeNav}
        onOpen={openNav}
        PaperProps={{
          sx: { width: 280, border: 'none', background: '#313131', color: '#e1e1e1', overflow: 'hidden' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '-10px',
          }}
        >
          <Typography variant="h6" mx={4}>
            Navigation
          </Typography>
          <IconButton onClick={closeNav}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box role="presentation" onClick={closeNav} onKeyDown={closeNav}>
          <List>
            {navItems.map((item) => (
              <div key={item.id}>
                <ListItem>
                  <ListItemButton onClick={item.onClick}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </div>
  );
};

export default NavItemDrawer;
