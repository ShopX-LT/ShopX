import { useContext } from "react";

// CONTEXT
import StyleContext from "../context/StyleProvider";

const useStyle = () => {
  return useContext(StyleContext);
};

export default useStyle;
