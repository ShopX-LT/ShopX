import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';
import cartReducer from '../redux/cart/cartSlice';
import userReducer from '../redux/user/userSlice';
import webDesignReducer from '../redux/webDesign/webDesignSlice';
import webDesignSlice from './webDesign/webDesignSlice';

const rootPersistConfig = { key: 'root', storage, version: 1 };
const designPersistConfig = {
  key: 'design',
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  webDesign: persistReducer(designPersistConfig, webDesignReducer),
  cart: cartReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
