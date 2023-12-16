import React from 'react';
import { Grid } from '@mui/material';
import useProduct from './hooks/useProduct';
import GeneralProductContainer from '../../lib/ProductContainer/GeneralProductContainer';

const ProductList = ({ products }) => {
  return (
    <Grid container spacing={3} my={1}>
      {products.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <GeneralProductContainer productStyle="simple" product={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
