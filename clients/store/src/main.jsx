import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { StoreProvider } from './context/StoreProvider';
import { store } from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
