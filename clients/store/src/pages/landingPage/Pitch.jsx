import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Typography, Button } from '@mui/material';
import { delayedFloatIn, floatIn } from './animations';

const salesPitch =
  'Harness the potential of an advanced e-commerce platform, engineered to optimize client engagement and enhance your income. Don’t overlook this chance!';

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
          height: '100vh',
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
        </Box>
        <Button variant="contained" color="secondary" sx={{ margin: '40px' }} href="https://admin.myshopx.net/signup">
          Create your store
        </Button>
      </Box>
    </motion.div>
  );
};

export default Pitch;
