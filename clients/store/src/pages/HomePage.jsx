import React from 'react';
import GeneralHero from '../lib/hero/GeneralHero';
import { Helmet } from 'react-helmet-async';
import { capitalize } from 'lodash';
import useStore from '../hooks/useStore';
import LandingPage from './landingPage/LandingPage';
import FeaturedSection from '../lib/FeaturedSection/FeaturedSection';
import { Container } from '@mui/material';
import AboutSection from '../lib/AboutSection/AboutSection';
import ContactSection from '../lib/contactSection/ContactSection';
import { useSelector } from 'react-redux';

const heroOptions = { minimalist: 'minimalist', legacy: 'legacy', leftText: 'leftText' };

const mock = { style: 'default' };

const HomePage = () => {
  const { store } = useStore();
  const design = useSelector((state) => state.webDesign);

  return (
    <div>
      {store ? (
        <>
          <Helmet>
            <title>{capitalize(store)} - ShopX</title>
          </Helmet>
          <GeneralHero heroStyle={design.hero.heroStyle} />
          <FeaturedSection select={mock.style} />
          <AboutSection select={design.about.aboutStyle} />
          <ContactSection select={design.contact.contactStyle} />
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default HomePage;
