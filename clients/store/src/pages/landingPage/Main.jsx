import React from 'react';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import { MainContainer } from './styles';
import Hero from './Hero.jsx';
import Features from './Features.jsx';
import Pitch from './Pitch.jsx';
import Subscription from './Subscription.jsx';

const Main = () => {
  return (
    <MainContainer>
      <Navbar />
      <Container>
        <Hero />
        <Features />
        <Pitch />
        <Subscription />
      </Container>
    </MainContainer>
  );
};

export default Main;
