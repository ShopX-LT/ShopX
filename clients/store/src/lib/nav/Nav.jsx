import React from 'react';
import LegacyNav from './LegacyNav';

const renderNav = (props) => {
  switch (props.navStyle) {
    case 'legacy':
      return <LegacyNav {...props} />;
    default:
      return <LegacyNav {...props} />;
  }
};

const Nav = (props) => {
  return <div>{renderNav(props)}</div>;
};

export default Nav;
