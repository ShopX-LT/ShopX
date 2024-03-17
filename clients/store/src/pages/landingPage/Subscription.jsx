import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box, Container, Typography, Stack, Link, Button, Tooltip } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InstagramIcon from '@mui/icons-material/Instagram';
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
            Get Latest Updates On Features Or Contact Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <a href={`https://www.instagram.com/shopx-lt`} target="_blank" rel={'external'}>
              <Tooltip title="Instagram" placement="top">
                <InstagramIcon />
              </Tooltip>
            </a>
            <a href={`mailto:myshopinfo@gmail.com`}>
              <Tooltip title="email" placement="top">
                <MailIcon />
              </Tooltip>
            </a>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Subscription;
