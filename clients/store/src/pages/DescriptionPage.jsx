import React, { forwardRef, useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

import './styles.css';

// import required modules
import { EffectCards } from 'swiper/modules';
import { useSelector } from 'react-redux';
import Review from '../lib/review/Review';
import { fCurrency } from '../utils/formatNumber';
import useReview from '../sections/products/hooks/useReview';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DescriptionPage = ({ isOpen, handleClose, product }) => {
  const design = useSelector((state) => state.webDesign);
  const { reviews, isLoading } = useReview({ itemId: product.id, isOpen });

  return (
    <div style={{ background: design.mainBackgroundColor }}>
      <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar
          sx={{ position: 'relative', background: design.nav.navBackgroundColor, color: design.nav.navTextColor }}
        >
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {product.title}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              variant="contained"
              onClick={handleClose}
              sx={{
                color: design.productContainer.productActionButtonTextColor,
                background: design.productContainer.productActionButtonColor,
              }}
            >
              {design.productContainer.productActionButtonText}
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            backgroundColor: design.mainBackgroundColor,
            color: design.hero.heroSubTextColor,
            height: '100%',
            maxWidth: '100vw',
            overflowY: 'scroll',
          }}
        >
          <Container>
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'Start',
                alignItems: 'start',
              }}
            >
              <Box>
                <ImageSwiper product={product} />
              </Box>
              <Box>
                <Typography variant="h3" fontWeight={500}>
                  {product.title}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={300}
                  sx={{ textDecoration: product.discount ? 'line-through' : null }}
                >
                  {fCurrency(product.price)}
                </Typography>
                {product.discount ? (
                  <Typography variant="h6" fontWeight={300}>
                    {fCurrency(product.price * (1 - product.discount / 100))}
                  </Typography>
                ) : null}
              </Box>
            </Box>

            <Box my={4}>
              <Typography variant="h3" fontWeight={700} marginBottom={1}>
                Description
              </Typography>
              <Typography variant="body1">{product.description}</Typography>

              <Typography variant="h3" fontWeight={700} marginTop={4} marginBottom={1}>
                Reviews
              </Typography>
              <Box>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  reviews.map((review, index) => (
                    <Review
                      key={index}
                      select="default"
                      name={review.name}
                      rating={review.rating}
                      comment={review.comment}
                    />
                  ))
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Dialog>
    </div>
  );
};

export default DescriptionPage;

function ImageSwiper({ product }) {
  return (
    <>
      {/* <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
        {product.imagesUrl.map((imageUrl, index) => {
          return (
            <SwiperSlide key={imageUrl}>
              <img alt={'x'} src={imageUrl} />
            </SwiperSlide>
          );
        })}
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper> */}
      <Carousel
        ariaLabel="product images"
        showArrows={true}
        showStatus={false}
        showThumbs={true}
        thumbWidth={100}
        showIndicators={true}
        infiniteLoop={true}
        swipeable={true}
        emulateTouch={true}
        useKeyboardArrows={true}
      >
        {product.imagesUrl.map((imageUrl, index) => {
          return (
            <Box key={imageUrl}>
              <img style={{ maxHeight: '520px', maxWidth: '420px', objectFit: 'cover' }} alt={'x'} src={imageUrl} />
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}
