import React, { useEffect, Suspense } from 'react';
import Main from './Main';
const SpaceBackground = React.lazy(() => import('./components/canvas/SpaceBackground'));

const LandingPage = () => {
  useEffect(() => {
    try {
      axios.get('https://myshopx.net/api/newvisit');
    } catch (error) {}
  }, []);

  return (
    <>
      <Suspense>
        <SpaceBackground fallback={<div style={{ background: 'black' }}></div>} />
      </Suspense>
      <Main />
    </>
  );
};

export default LandingPage;
