import { AppBar, Box, Typography, styled } from '@mui/material';

export const StyledDescriptionPageAppBar = styled(AppBar)(({ design }) => ({
  position: 'relative',
  background: design.nav.navBackgroundColor,
  color: design.nav.navTextColor,
}));

export const FullViewPortBody = styled(Box)(({ design }) => ({
  backgroundColor: design.mainBackgroundColor,
  color: design.hero.heroSubTextColor,
  height: '100%',
  maxWidth: '100vw',
  overflowY: 'scroll',
}));

export const FlexColumnAlignedToStart = styled(Box)(() => ({
  my: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'Start',
  alignItems: 'start',
}));

export const StyledProductPrice = styled(Typography)(({ hasDiscount }) => ({
  textDecoration: hasDiscount ? 'line-through' : null,
  fontSize: hasDiscount ? '14px' : '16px',
}));
