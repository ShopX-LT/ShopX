import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Router from "./routes";
import { editStyle } from "./style";
import { useEffect } from "react";
import { useState } from "react";
import useStyle from "./hooks/useStyle";
import "react-toastify/dist/ReactToastify.css";
import ExtractStore from "./components/ExtractStore";
import useStore from "./hooks/useStore";
import LandingPage from "./pages/LandingPage";

const mock = {
  primaryColor: "brown-gradient",
  brandColor: "[#000]",
  secondaryColor: "[#fff]",
  textColor1: "[#fff]",
};
//REPLACE WITH API

const App = () => {
  const { style, setStyle } = useStyle();
  const [activeStore, setActiveStore] = useState("");
  const { store } = useStore();

  useEffect(() => {
    const presetStyles = editStyle(style, {
      primaryColor: `bg-${mock.primaryColor}`,
      brandColor: `bg-${mock.primaryColor}`,
      secondaryColor: `bg-${mock.secondaryColor}`,
      textColor1: `bg-${mock.textColor1}`,
    });
    setStyle(() => presetStyles);
  }, []);

  return (
    <div>
      {/* {setDefault()} */}
      <ExtractStore />

      {store ? (
        <>
          <div
            className={`w-full ${style.primaryColor}  min-h-[100vh] flex justify-center`}
          >
            <div className={`${style.container} sm:px-16 px-6`}>
              <BrowserRouter basename={`${store}`}>
                <Router />
              </BrowserRouter>
            </div>
          </div>
        </>
      ) : (
        <LandingPage />
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
    </div>
  );
};

export default App;
