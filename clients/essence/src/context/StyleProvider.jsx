import { createContext, useState } from "react";
import defaultStyle from "../style";

const StyleContext = createContext({});

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState(defaultStyle);
  const [store, setStore] = useState({ store: "tshop" });

  return (
    <StyleContext.Provider value={{ style, setStyle, store, setStore }}>
      {children}
    </StyleContext.Provider>
  );
};

export default StyleContext;
