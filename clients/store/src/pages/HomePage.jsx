import React from 'react';
import GeneralHero from '../lib/hero/GeneralHero';
import { Helmet } from 'react-helmet-async';
import { capitalize } from 'lodash';
import useStore from '../hooks/useStore';
import LandingPage from './landingPage/LandingPage';

const heroOptions = { minimalist: 'minimalist', legacy: 'legacy', leftText: 'leftText' };

const HomePage = () => {
  const { store } = useStore();
  return (
    <div>
      {store ? (
        <>
          <Helmet>
            <title>{capitalize(store)} - ShopX</title>
          </Helmet>
          <GeneralHero heroStyle={heroOptions.leftText} />
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default HomePage;
