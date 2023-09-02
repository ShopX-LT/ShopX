import { createContext, useState } from "react";

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState("");

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
