import React from 'react';
import MinimalistHero from './MinimalistHero';

const GeneralHero = (props) => {
  switch (props.style) {
    case 'legacy':
      return <LegacyGeneralHero {...props} />;
    case 'minimalist':
      return <MinimalistHero />;
    default:
      return <LegacyGeneralHero {...props} />;
  }
};

export default GeneralHero;
