import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { getAllItems } from '../services/ItemService';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const axiosPrivate = useAxiosPrivate();
  const [products, setProducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const retrieveProducts = async () => {
      const response = await getAllItems(axiosPrivate);
      console.log(response);
      if (!response) {
        setProducts([]);
        return;
      }
      setProducts(response);
    };

    retrieveProducts();
  }, []);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
        <ProductCartWidget />
      </Container>
    </>
  );
}
