import { AppBar, Box, Button, styled } from '@mui/material';

export const MainContainer = styled(Box)(() => ({
  backgroundColor: 'transparent',
  color: '#f1f2ee',
  minHeight: '100vh',
  maxWidth: '100vw',
  position: 'relative',
}));

export const AppBarStyled = styled(AppBar)(() => ({
  background: 'rgb(10,10,10, 0.7)',
  // border: '1px red solid',
  backdropFilter: 'blur(0.5px)',
  position: 'sticky',
  top: 0,
  boxShadow: '0px 0.5px 2px rgb(12,67,17)',
}));

export const HeroContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
  width: '100%',
  minHeight: '80vh',
  textAlign: 'center',
  position: 'relative',
  marginBottom: 4,
}));

export const ActionButton = styled(Button)(() => ({}));
