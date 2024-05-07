import React from 'react';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import { MainContainer } from './styles';
import Hero from './Hero';
import Features from './Features';
import Pitch from './Pitch';
import Subscription from './Subscription';

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
