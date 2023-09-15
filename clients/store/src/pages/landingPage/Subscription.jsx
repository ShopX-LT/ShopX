import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Container, Typography, Stack, Link, Button } from '@mui/material';
import axios from 'axios';
import './styles.css';

const bgColor = '#000';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
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

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://myshopx.net/api/email/sub', { receiver: email });
      setSuccess(true);
    } catch (error) {}
  };

  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={controls} transition={{ duration: 1 }}>
      <Box
        sx={{
          background: bgColor,
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '500px',
            marginTop: '150px',
            minHeight: '25%',
          }}
        >
          <Typography my={2} variant="h2" sx={{ fontSize: { xs: '32px', lg: '48', fontWeight: 'bold' } }}>
            Sit Back and Relax
          </Typography>
          <Typography>
            We take the hassle out of setting up an online store. From stunning storefronts to user-friendly admin
            dashboards, everything is ready to go!
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            minHeight: '40vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography my={2} variant="h2" sx={{ fontSize: { xs: '32px', lg: '48', fontWeight: 'bold' } }}>
            Get latest updates on features & promos
          </Typography>
          <div>
            <form onSubmit={handleFormSubmit}>
              <input
                placeholder="Enter your email"
                className="input"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
              />
              <Button variant="contained" sx={{ padding: '15px', marginLeft: '10px' }} type="submit">
                Pre-subscribe
              </Button>
            </form>
          </div>
          {success && <Typography variant="caption"> You are subscribed to receive updates!</Typography>}
        </Box>
      </Box>
    </motion.div>
  );
};

export default Subscription;
