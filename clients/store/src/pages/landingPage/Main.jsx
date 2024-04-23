import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid } from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TuneIcon from '@mui/icons-material/Tune';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { floatIn } from './animations';
import Pitch from './Pitch';
import AbouAdmin from './AbouAdmin';
import Subscription from './Subscription';
import welcomeImage from './images/welcome.jpg';
import Card from './components/Card';
import Navbar from './components/Navbar';
import { ActionButton, HeroContainer, MainContainer } from './styles';
import { displayFeatureStore, displayMeme } from './Helper';

const Main = () => {
  return (
    <MainContainer>
      {' '}
      {/* This will prevent the white sides that are left from using container, it can be removed when the body css is set*/}
      <Navbar />
      <Container>
        <motion.div initial="initial" animate="animate" variants={floatIn}>
          <HeroContainer>
            <Typography
              my={2}
              align="center"
              variant="h1"
              sx={{
                fontSize: { xs: '52px', md: '120px', lg: '150px' },
                fontWeight: 'bold',
              }}
            >
              SHOPX
            </Typography>
            <Box marginTop={2}>
              <Typography variant="h6">Start Building Your Success Story Today—Sell online with ShopX!</Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'block' } }} my={1} variant="body1">
                Create a FREE website effortlessly with SHOPX
              </Typography>
            </Box>
            <ActionButton
              variant="contained"
              sx={{ background: 'rgb( 31, 110, 38 )', marginY: 4 }}
              href="https://admin.myshopx.net/signup"
            >
              Get your free website!
            </ActionButton>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%' }}>
              <Grid container gap={3} alignItems={'center'} justifyContent={'center'} marginTop={8} marginBottom={8}>
                <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {displayFeatureStore(0)}
                </Grid>
                {/* <Grid item sm={3}> */}
                {/* {displayMeme(welcomeImage)} */}
                {/* <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '52px', md: '48px', lg: '24px' },
                      fontWeight: '400',
                    }}
                  >
                    Featured Stores
                  </Typography> */}
                {/* </Grid> */}
                <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {displayFeatureStore(1)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: { md: 'none' }, width: '100%' }}>
              <Swiper
                loop={true}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
              >
                <SwiperSlide>{displayFeatureStore(0)}</SwiperSlide>
                {/* <SwiperSlide>{displayMeme(welcomeImage)}</SwiperSlide> */}
                <SwiperSlide>{displayFeatureStore(1)}</SwiperSlide>
              </Swiper>
            </Box>
          </HeroContainer>

          <Grid container sx={{ justifyContent: 'center', gap: { xs: 8, sm: 2 } }}>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="body">Here's what you get with ShopX:</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card
                icon={<TuneIcon fontSize={'large'} />}
                title={'Customizable templates'}
                body={'Design and customize your free website to match your brand.'}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card
                icon={<ManageAccountsIcon fontSize={'large'} />}
                title={' Inventory management'}
                body={'Manage your products and orders. get notified when items are low on stock.'}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Card
                icon={<AssuredWorkloadIcon fontSize={'large'} />}
                title={'Secure payments'}
                body={'Receive payment form your customers securly and withdraw at anytime.'}
              />
            </Grid>
          </Grid>

          <Pitch />
          {/* ADD CAROUSEL OF ORDER, PRODUCT AND PAYMENT MANAGEMENT */}
          {/* <AbouAdmin /> */}
          <Subscription />
        </motion.div>
      </Container>
    </MainContainer>
  );
};

export default Main;
