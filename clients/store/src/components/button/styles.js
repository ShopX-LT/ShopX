import { Button, styled } from '@mui/material';

export const ButtonStyle = styled(Button)(({ theme, design }) => ({
  background: design.bgColor,
  color: design.textColor,
  width: design.width,
  ...(design.hover && {
    '&:hover': {
      background: design.textColor,
      color: design.bgColor,
    },
  }),
}));
