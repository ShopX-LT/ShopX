import { Button, Box, styled, Typography } from '@mui/material';

export const CartItemContainer = styled(Box)(({ theme, design }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '10px',
  marginBottom: '30px',
  height: '100px',
}));

export const DetailsContainer = styled(Box)(({ theme, design }) => ({
  // border: '1px black solid',
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  gap: 1,
}));

export const Details = styled(Box)(({ theme, design }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  // justifyContent: 'space-between',
  // maxWidth: '125px',
  maxWidth: '100%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

export const Title = styled(Typography)(({ theme, design }) => ({
  maxHeight: '50px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const CounterContainer = styled(Box)(({ theme, design }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
}));
