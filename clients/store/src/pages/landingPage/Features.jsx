import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Container, Typography, Grid } from '@mui/material';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TuneIcon from '@mui/icons-material/Tune';

import Card from './components/Card';

const Features = () => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        // Adjust this value as needed
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, isVisible]);
  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={controls} transition={{ duration: 1 }}>
      <Grid container mt={2} sx={{ justifyContent: 'center', gap: { xs: 8, sm: 2 } }}>
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
    </motion.div>
  );
};

export default Features;
