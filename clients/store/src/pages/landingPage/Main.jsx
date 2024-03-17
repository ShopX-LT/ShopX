import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid, Button, Paper, AppBar, Toolbar } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TuneIcon from '@mui/icons-material/Tune';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import salesImage from './images/sales.jpg';
import welcomeImage from './images/welcome.jpg';
import crossroadsImage from './images/crossroads.jpg';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import './styles.css';
import { floatIn } from './animations';
import Pitch from './Pitch';
import AbouAdmin from './AbouAdmin';
import Subscription from './Subscription';
import Card from './components/Card';
import FeatureStoreCard from './components/FeatureStoreCard';

const bgColor = '#000';

const Main = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        color: '#f1f2ee',
        minHeight: '100vh',
        maxWidth: '100vw',
        position: 'relative',
      }}
    >
      {' '}
      {/* This will prevent the white sides that are left from using container, it can be removed when the body css is set*/}
      <Container>
        <Box marginBottom={5}>
          <AppBar
            sx={{
              background: 'rgb(20,20,20)',
              backdropFilter: 'blur( 6.5px )',
            }}
          >
            <Toolbar>
              <Container>
                <Typography variant="h6" component="div">
                  SHOPX
                </Typography>
              </Container>
            </Toolbar>
          </AppBar>
        </Box>
        <motion.div initial="initial" animate="animate" variants={floatIn}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              width: '100%',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <Typography variant="h3">Are you a business owner without a website?</Typography>
            <Typography variant="body">Create a FREE website effortlessly with SHOPX</Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%' }}>
              <Grid container gap={3} alignItems={'center'} justifyContent={'center'} marginTop={8} marginBottom={8}>
                <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FeatureStoreCard
                    imageSource="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    storeName="La Prisa"
                    grossIncome="₦1.5m"
                  />
                </Grid>
                <Grid item sm={3}>
                  <Paper elevation={3}>
                    <img
                      style={{ objectFit: 'cover', width: '300px', height: '300px', borderRadius: '5px' }}
                      src={welcomeImage}
                    />
                  </Paper>
                </Grid>
                <Grid item sm={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <FeatureStoreCard
                    imageSource="https://images.unsplash.com/photo-1624489173879-7cc62610ddea?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    storeName="Five-Girls"
                    grossIncome="#1.8m"
                  />
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
                <SwiperSlide>
                  <FeatureStoreCard
                    imageSource="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    storeName="La Prisa"
                    grossIncome="₦1.5m"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Paper elevation={3}>
                    <img
                      style={{ objectFit: 'cover', width: '300px', height: '300px', borderRadius: '5px' }}
                      src={welcomeImage}
                    />
                  </Paper>
                </SwiperSlide>
                <SwiperSlide>
                  <FeatureStoreCard
                    imageSource="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNsb3RoZXN8ZW58MHx8MHx8fDA%3D"
                    storeName="Five-Girls"
                    grossIncome="#1.8m"
                  />
                </SwiperSlide>
              </Swiper>
            </Box>
            <Button
              variant="contained"
              sx={{ background: 'rgb( 31, 110, 38 )' }}
              href="https://admin.myshopx.net/signup"
            >
              Get your free website!
            </Button>
          </Box>

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
    </Box>
  );
};

export default Main;
