import React from 'react';
import LegacyHero from './LegacyHero';
import MinimalistHero from './MinimalistHero';

const selecHero = (props) => {
  switch (props.heroStyle) {
    case 'legacy':
      return <LegacyHero {...props} />;
    case 'minimalist':
      return <MinimalistHero />;
    default:
      return <LegacyHero {...props} />;
  }
};

const GeneralHero = (props) => {
  return <div>{selecHero(props)}</div>;
};

export default GeneralHero;
