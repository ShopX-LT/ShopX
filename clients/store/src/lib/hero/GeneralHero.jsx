import React from 'react';
import LegacyHero from './LegacyHero';
import MinimalistHero from './MinimalistHero';
import LeftText from './LeftText';
import BottomLeft from './BottomLeft';

const selecHero = (props) => {
  switch (props.heroStyle) {
    case 'legacy':
      return <LegacyHero {...props} />;
    case 'minimalist':
      return <MinimalistHero />;
    case 'leftText':
      return <LeftText />;
    case 'bottomLeft':
      return <BottomLeft />;
    default:
      return <LegacyHero {...props} />;
  }
};

const GeneralHero = (props) => {
  return <div>{selecHero(props)}</div>;
};

export default GeneralHero;
