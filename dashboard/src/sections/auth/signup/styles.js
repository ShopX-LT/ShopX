import { AppBar, Box, styled } from '@mui/material';

export const BackgroundStyle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  zIndex: -2,
  height: '100%',
  width: '100vw',
  filter: 'blur(5px)',
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundRepeat: 'no-repeat',
  backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const BackgroundTintOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  zIndex: -1,
  top: 0,
  left: 0,
  width: '100vw',
  height: '100%',
  background: 'white',
  opacity: 0.7,
}));

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  position: 'relative',
  top: 0,
  cursor: 'pointer',
  borderBottom: (t) => `1px solid ${t.palette.divider}`,
}));
