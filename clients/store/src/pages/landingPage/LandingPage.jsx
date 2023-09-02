import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Stack, Link } from '@mui/material';
import { delayedFloatIn, floatIn } from './animations';
import Pitch from './Pitch';
import AbouAdmin from './AbouAdmin';
import Subscription from './Subscription';

const bgColor = '#000';
const LandingPage = () => {
  return (
    <Box sx={{ backgroundColor: bgColor, minHeight: '100vh', maxWidth: '100vw' }}>
      {' '}
      {/* This will prevent the white sides that are left from using container, it can be removed when the body css is set*/}
      <Container>
        <motion.div initial="initial" animate="animate" variants={floatIn}>
          <Box
            sx={{
              background: bgColor,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2">(Release date 18th of September)</Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '94px', md: '143px', lg: '202px' },
                fontWeight: 'bold',
              }}
            >
              SHOPX
            </Typography>

            <Box
              sx={{
                maxWidth: {
                  xs: '306px',
                  md: '658px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              }}
              marginTop={0}
              marginBottom={1}
            >
              <Typography variant="body">
                Are you a Nigerian entrepreneur ready to profit from your products?
              </Typography>
            </Box>
            <Box sx={{ maxWidth: { xs: '295px', md: '600px' } }} marginBottom={4}>
              <Typography variant="body">
                This is ShopX. Your one stop solution to building your online store
              </Typography>
            </Box>
            <Stack direction={'row'} spacing={{ xs: 2, md: 4, alignItems: 'center' }} useFlexGap flexWrap="wrap">
              <Link variant="body" href="https://admin.myshopx.net/signup">
                Create your store (demo)
              </Link>
              <Link variant="body" href="/kg-watches">
                Visit a website (demo)
              </Link>
            </Stack>
          </Box>

          <Pitch />
          {/* ADD CAROUSEL OF ORDER, PRODUCT AND PAYMENT MANAGEMENT */}
          <AbouAdmin />
          <Subscription />
        </motion.div>
      </Container>
    </Box>
  );
};

export default LandingPage;
