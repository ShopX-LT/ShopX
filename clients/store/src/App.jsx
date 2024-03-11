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

  const renderPage = () => {
    if (store && isStoreValid) {
      return (
        <BrowserRouter basename={`${store}`}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      );
    } else if (store && !isStoreValid) {
      alert('This store does not exist');
      return (
        <ThemeProvider>
          <LandingPage />
        </ThemeProvider>
      );
    } else if (!store) {
      return (
        <ThemeProvider>
          <LandingPage />
        </ThemeProvider>
      );
    } else {
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>;
    }
  };

  return (
    <HelmetProvider>
      <ExtractStore />
      {renderPage()}
    </HelmetProvider>
  );
}

export default App;
