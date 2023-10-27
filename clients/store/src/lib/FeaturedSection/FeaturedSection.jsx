import React from 'react';
import Default from './Default';

const selector = (props) => {
  switch (props.select) {
    case 'default':
      return <Default {...props} />;
    default:
      return <Default {...props} />;
  }
};
const FeaturedSection = (props) => {
  return <div>{selector(props)}</div>;
};

export default FeaturedSection;
