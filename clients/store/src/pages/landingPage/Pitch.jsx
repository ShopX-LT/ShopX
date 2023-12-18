import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Typography, Button, Grid, Link } from '@mui/material';
import { delayedFloatIn, floatIn } from './animations';

const salesPitch =
  'Our motivation? We want to simplify your life. No technical hurdles. No hassle of maintenance Don’t overlook this chance!';

const Pitch = () => {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
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
      <Box
        sx={{
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          width: '100%',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '32px', lg: '48' },
            fontWeight: 'bold',
            margin: '40px',
          }}
          align="center"
        >
          Skyrocket Sales!
        </Typography>
        <Box sx={{ width: { xs: '350px', md: '500px' }, textAlign: 'center' }}>
          <Typography variant="body">{salesPitch}</Typography>
          <Grid container mt={2} gap={4} justifyContent={'center'}>
            <Grid item xs={12}>
              <Link variant="body" href="/jay-shop">
                See a demo site
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: '40px', background: 'rgb( 31, 110, 38 )' }}
          href="https://admin.myshopx.net/signup"
        >
          Create your free website!
        </Button>
      </Box>
    </motion.div>
  );
};

export default Pitch;
