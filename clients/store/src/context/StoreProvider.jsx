import { createContext, useState } from 'react';

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState('');
  const [isStoreValid, setIsStoreValid] = useState(false);

  return (
    <StoreContext.Provider value={{ store, setStore, isStoreValid, setIsStoreValid }}>{children}</StoreContext.Provider>
  );
};

export default StoreContext;
