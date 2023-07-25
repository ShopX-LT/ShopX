import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// theme
import ThemeProvider from './theme';
import ActionButton from './button/ActionButton';
// components

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ActionButton text="Browse" />
          {/* <ScrollToTop /> */}
          {/* <Router /> */}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
