import { AppBar, Box, Button, styled } from '@mui/material';

export const MainContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#f1f2ee',
  minHeight: '100vh',
  maxWidth: '100vw',
  position: 'relative',
}));

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: 'rgb(20,20,20)',
  backdropFilter: 'blur( 6.5px )',
}));

export const HeroContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100%',
  textAlign: 'center',
  position: 'relative',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  background: 'rgb( 31, 110, 38 )',
}));
