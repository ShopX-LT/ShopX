import { Button, Box, styled, Typography } from '@mui/material';

export const PageContainer = styled(Box)(({ theme, design }) => ({
  width: '375px',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: design?.justifyCenter ? 'center' : '',
}));

export const FlexContainer = styled(Box)(({ theme, design }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '100px',
}));

export const LegacyTextContainer = styled(Box)(({ theme, design }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const LegacyImageContainer = styled(Box)(({ theme, design }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const MinimalistImageContainer = styled(Box)(({ theme, design }) => ({
  position: 'absolute',
  top: '56px',
  left: 0,
  width: '100vw',
  height: '100vh',
}));

export const ImageCover = styled(Box)(({ theme, design }) => ({
  position: 'absolute',
  top: '56px',
  left: 0,
  width: '100vw',
  height: '95vh',
  background: 'black',
  opacity: design?.coverOpacity,
}));

export const MinimalistTextContainer = styled(Box)(({ theme, design }) => ({
  zIndex: 1,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  [theme.breakpoints.up('md')]: {
    maxWidth: '600px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '700px',
  },
}));
