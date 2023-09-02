import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Container, Typography, Stack } from '@mui/material';

const bgColor = '#000';

const AbouAdmin = () => {
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
      <Box
        sx={{
          background: bgColor,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Stack
          my={4}
          direction={{ xs: 'column-reverse', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            m={4}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '500px',
            }}
          >
            <Typography
              variant="h3"
              my={2}
              sx={{
                fontSize: { xs: '32px', lg: '48', fontWeight: 'bold' },
              }}
            >
              Intuitive admin dashboard for easy store management
            </Typography>
            <Typography>
              Managing your e-commerce empire has never been so simple. Tackle order fulfillment, product updates, and
              payment processing all in one handy admin dashboard!
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '300px',
                height: '300px',
                // border: '1px purple solid',
                borderRadius: '10px',
              }}
            ></Box>
          </Box>
        </Stack>
        <Stack my={4} direction={{ xs: 'column-reverse', md: 'row-reverse' }} alignItems="center">
          <Box
            m={4}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '500px',
            }}
          >
            <Typography variant="h3" my={2} sx={{ fontSize: { xs: '32px', lg: '48', fontWeight: 'bold' } }}>
              Manage Your Empire
            </Typography>
            <Typography>
              Get in-depth insights with real-time data on your store’s performance, helping you make informed decisions
              for growth and success.
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                width: '300px',
                height: '300px',
                // border: '1px purple solid',
                borderRadius: '10px',
              }}
            >
              {/* this is the image */}
            </Box>
          </Box>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default AbouAdmin;
