import React from 'react';
import SimpleContainer from './SimpleContainer';
import GlassContainer from './GlassContainer';

const GeneralProductContainer = (props) => {
  switch (props.style) {
    case 'simple':
      return <SimpleContainer {...props} />;
    case 'glass':
      return <GlassContainer {...props} />;
    default:
      return <GlassContainer {...props} />;
  }
};

export default GeneralProductContainer;
