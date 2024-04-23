import { Button, Box, styled, Typography } from '@mui/material';
import { ActionButton } from '../styles';

export const GroupContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  height: '250px',
  width: '250px',
}));

export const ItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  height: '90%',
  width: '100%',
  border: '1px solid rgba( 31, 138, 38, 0.37  )',
  borderRadius: '10px',
  backdropFilter: 'blur( 6.5px )',
  '&:hover': {
    boxShadow: '0 2px 10px 0 rgba( 31, 138, 38, 0.37 )',
  },
}));

export const ImageRelativeContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '85%',
  width: '100%',
}));
export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  top: 0,
  left: 0,
}));

export const imageStyle = {
  objectFit: 'cover',
  height: '100%',
  width: '100%',

  borderRadius: '10px 10px 0px 0px',
};

export const TextContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '5px',
  borderRadius: '5px',
}));

export const VisitButton = styled(Button)(({ theme }) => ({
  width: '80%',
  margin: '5px',
  border: '1px solid rgba( 31, 138, 38, 0.37  )',
  color: 'rgb( 31, 110, 38 )',
}));
