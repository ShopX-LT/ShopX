import { useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Button, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import ProductDrawer from './Drawer';
import EditProductForm from './EditProductForm';
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { title, imagesUrl, price, discount, quantity } = product;
  const priceSale = discount === 0 ? 0 : price * (1 - discount / 100);
  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOnDelete = async () => {};

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={discount === 0 ? 'info' : 'error'}
          // color={'info'}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {discount}%
        </Label>

        <StyledProductImg alt={title} src={imagesUrl[0]} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="start">
          {/* <ColorPreview colors={colors} /> */}
          <Typography
            variant="subtitle1"
            sx={{
              color: `${priceSale > 0 ? 'text.disabled' : null}`,
              textDecoration: `${priceSale > 0 ? 'line-through' : 'none'}`,
            }}
          >
            {fCurrency(price)}
          </Typography>
          {priceSale > 0 ? <Typography variant="subtitle1">&nbsp;{fCurrency(priceSale)}</Typography> : null}
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <Button variant="outlined" color="secondary" onClick={handleOpenFilter}>
            <EditIcon />
          </Button>
          <Button variant="outlined" color="error" onClick={handleOnDelete}>
            <DeleteIcon />
          </Button>
        </Stack>
        <ProductDrawer title="Edit Product" openFilter={openFilter} onCloseFilter={handleCloseFilter} width={450}>
          <EditProductForm product={product} onCloseFilter={handleCloseFilter} />
        </ProductDrawer>
      </Stack>
    </Card>
  );
}
