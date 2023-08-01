import { Box } from '@mui/material';
import React from 'react';
import './style.css';
import BrandHeading from '../text/BrandHeading';
import Body from '../text/Body';
import ActionButton from '../button/ActionButton';
import GeneralButton from '../button/GeneralButton';

const mock = {
  mainText: ' Lorem ipsum dolor',
  mainTextColor: 'white',

  subText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis !',
  subTextColor: 'white',

  actionButtonStyle: '',
  actionButtonText: 'Click Me!',
  actionButtonColor: 'black',
  actionButtonTextColor: '',

  imageUrl:
    'https://images.unsplash.com/photo-1682685797366-715d29e33f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  imageBlur: '5',
  coverOpacity: 0.6,
};
const MinimalistHero = () => {
  return (
    <Box sx={{ maxWidth: '100vw', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* IMAGE */}

      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <img
          style={{ width: '100%', height: '100%', filter: `blur(${mock.imageBlur}px)` }}
          src={mock.imageUrl}
          alt="background image"
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'black',
          opacity: mock.coverOpacity,
        }}
      ></Box>
      {/* TEXT */}
      <Box
        sx={{
          zIndex: 1,
          maxWidth: { xs: '400px', md: '600px', lg: '700px' },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <BrandHeading
          text={mock.mainText}
          textColor={mock.mainTextColor}
          weight="500"
          lineHeight={1}
          marginTop={4}
          marginBottom={1}
        />
        <Box sx={{ maxWidth: { xs: '300px', md: '400px' } }}>
          <Body text={mock.subText} textColor={mock.subTextColor} marginBottom={4} />
        </Box>
        <GeneralButton style="minimalist" text={mock.actionButtonText} bgColor={mock.actionButtonColor} width="150px" />
      </Box>
    </Box>
  );
};

export default MinimalistHero;
