import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useNavigate } from 'react-router-dom';
import useProduct from '../../sections/products/hooks/useProduct';
import useCategory from '../../sections/products/hooks/useCategory';
import GeneralProductContainer from '../ProductContainer/GeneralProductContainer';
import { useSelector } from 'react-redux';

const Default = () => {
  const navigate = useNavigate();
  const heroDesign = useSelector((state) => state.webDesign.hero);

  const { customCategories, selectedCategory, selectedCustomCategories } = useCategory();
  const { items } = useProduct({
    selectedCustomCategories,
    customCategories,
    selectedCategory,
  });

  const products = items.length > 3 ? items.slice(0, 3) : items;

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ fontWeight: 'bold', borderBottom: 1, borderColor: 'divider', color: heroDesign.heroHeadlineColor }}
      >
        Top Sellers
      </Typography>
      <Grid container spacing={3} py={8}>
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <GeneralProductContainer productStyle="simple" product={item} />
          </Grid>
        ))}

        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              color: heroDesign.heroHeadlineColor,
            }}
          >
            <Typography variant="subtitle1" onClick={() => navigate('/products')}>
              See more
            </Typography>
            <ArrowCircleRightIcon />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Default;
