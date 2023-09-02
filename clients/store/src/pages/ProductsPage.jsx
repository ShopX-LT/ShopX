import { Container, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useStore from '../hooks/useStore';
import ProductList from '../sections/products/ProductList';
import useProduct from '../sections/products/hooks/useProduct';
import FilterSideBar from '../sections/products/FilterSideBar';
import useCategory from '../sections/products/hooks/useCategory';
import SearchBar from '../sections/products/SearchBar';
import { useSelector } from 'react-redux';

const ProductsPage = () => {
  const { store } = useStore();
  const heroDesign = useSelector((state) => state.webDesign.hero);
  const {
    categories,
    changeCategory,
    changeCustomCategory,
    customCategories,
    resetFilter,
    selectedCategory,
    selectedCustomCategories,
  } = useCategory();
  const { items, searchParam, handleSearchChange, handleSearch } = useProduct({
    selectedCustomCategories,
    customCategories,
    selectedCategory,
  });

  return (
    <div>
      <Helmet>
        <title>{capitalize(store)} | Products- ShopX</title>
      </Helmet>
      <Container>
        <Typography variant="h6" sx={{ mb: 1, mt: 2, fontWeight: 400, color: heroDesign.heroSubTextColor }}>
          Showing results for: {capitalize(searchParam)} {capitalize(selectedCategory)}
        </Typography>
        <Stack direction={'row'} gap={2}>
          <FilterSideBar
            categories={categories}
            changeCategory={changeCategory}
            changeCustomCategory={changeCustomCategory}
            customCategories={customCategories}
            resetFilter={resetFilter}
            selectedCategory={selectedCategory}
            selectedCustomCategories={selectedCustomCategories}
          />
          <SearchBar searchParam={searchParam} handleChange={handleSearchChange} handleSearch={handleSearch} />
        </Stack>
        {items.length === 0 ? (
          <Typography variant="h3" sx={{ mb: 1, mt: 2, fontWeight: 400, color: heroDesign.heroSubTextColor }}>
            No result found
          </Typography>
        ) : (
          <ProductList products={items} />
        )}
      </Container>
    </div>
  );
};

export default ProductsPage;
