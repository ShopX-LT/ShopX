import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { displayFeatureStore } from '../Helper';
import { Box, Grid } from '@mui/material';

const FeaturedStores = () => {
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%' }}>
        <Grid container gap={3} alignItems={'center'} justifyContent={'center'} marginTop={8} marginBottom={8}>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            {displayFeatureStore(0)}
          </Grid>
          <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            {displayFeatureStore(1)}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: { md: 'none' }, width: '100%' }}>
        <Swiper
          style={{ height: '280px' }}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
        >
          <SwiperSlide>{displayFeatureStore(0)}</SwiperSlide>
          <SwiperSlide>{displayFeatureStore(1)}</SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
};

export default FeaturedStores;
