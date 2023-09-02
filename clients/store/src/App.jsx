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

  return (
    <HelmetProvider>
      <ExtractStore />
      {isStoreValid ? (
        <BrowserRouter basename={`${store}`}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      ) : (
        <ThemeProvider>
          <LandingPage />
        </ThemeProvider>
      )}
    </HelmetProvider>
  );
}

export default App;
