import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// theme
import ThemeProvider from './theme';
import Router from './router';
import useStore from './hooks/useStore';
import ExtractStore from './worker/ExtractStore';
import LoadingPage from './sections/loadingPage/LoadingPage';
import { Box, Typography } from '@mui/material';
import PageNotFound from './pages/PageNotFound';
import { useEffect } from 'react';
import LandingPage from './pages/landingPage/LandingPage';
// components

function App() {
  const { store, isStoreValid } = useStore();

  const renderPage = (store) => {
    if (store === 'myshopx' || store === 'www') {
      return (
        <ThemeProvider>
          <LandingPage />
        </ThemeProvider>
      );
    }
    if (store && isStoreValid) {
      return (
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      );
    }
    if (!store) {
      return <p>Loading ...</p>;
    }
    if (!isStoreValid) {
      return <p>Invalid page. Please create a website for free</p>;
    }
  };

  return (
    <HelmetProvider>
      <ExtractStore />
      {store ? renderPage(store) : null}
    </HelmetProvider>
  );
}

export default App;
