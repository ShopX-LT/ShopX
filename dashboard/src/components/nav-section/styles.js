// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));
export const StyledSectionItem = styled((props) => <ListItemText {...props} />)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: 500,
  marginLeft: 8,
  marginTop: 15,
  height: 32,
  position: 'relative',
  textTransform: 'capitalize',
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
