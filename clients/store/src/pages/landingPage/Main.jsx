import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TuneIcon from '@mui/icons-material/Tune';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import './styles.css';
import { floatIn } from './animations';
import Pitch from './Pitch';
import AbouAdmin from './AbouAdmin';
import Subscription from './Subscription';
import Card from './components/Card';

const bgColor = '#000';

const Main = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        color: '#fff',
        minHeight: '100vh',
        maxWidth: '100vw',
        position: 'relative',
      }}
    >
      {' '}
      {/* This will prevent the white sides that are left from using container, it can be removed when the body css is set*/}
      <Container>
        <motion.div initial="initial" animate="animate" variants={floatIn}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '90vh',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '94px', md: '140px', lg: '150px' },
                    fontWeight: '400',
                  }}
                >
                  SHOPX
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">Your one stop solution to building an online store</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body">Effortlessly create a FREE website today</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              sx={{ margin: '40px', background: 'rgb( 31, 110, 38 )' }}
              href="https://admin.myshopx.net/signup"
            >
              Get your free website!
            </Button>
          </Box>

          <Grid container sx={{ justifyContent: 'center', gap: { xs: 8, sm: 2 } }}>
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
