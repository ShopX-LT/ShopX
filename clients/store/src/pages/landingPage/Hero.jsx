import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import './styles.css';
import { floatIn } from './animations';
import { ActionButton, HeroContainer } from './styles';
import FeaturedStores from './components/FeaturedStores';

const Hero = () => {
  return (
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
            Selling online has never been esaier.
          </Typography>
          <Box mt={2}>
            <Typography variant="caption">(Limited offer) Register today and get all features for free</Typography>
          </Box>
        </Box>
        <ActionButton
          variant="contained"
          sx={{ background: 'rgb( 31, 110, 38 )', marginY: 4 }}
          href="https://admin.myshopx.net/signup"
        >
          Sign me up!
        </ActionButton>
        <FeaturedStores />
      </HeroContainer>
    </motion.div>
  );
};

export default Hero;
