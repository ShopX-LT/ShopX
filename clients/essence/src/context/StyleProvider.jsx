import { createContext, useState } from "react";
import defaultStyle from "../style";

const StyleContext = createContext({});

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState(defaultStyle);
  console.log(style);

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export default StyleContext;
