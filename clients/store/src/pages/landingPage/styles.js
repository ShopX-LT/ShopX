import { AppBar, Box, Button, styled } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#f1f2ee',
  minHeight: '100vh',
  maxWidth: '100vw',
  position: 'relative',
}));

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: 'transparent',
  // backdropFilter: 'blur( 6.5px )',
  position: 'relative',
  boxShadow: 'none',
}));

export const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
  width: '100%',
  textAlign: 'center',
  position: 'relative',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  background: 'rgb( 31, 110, 38 )',
}));
