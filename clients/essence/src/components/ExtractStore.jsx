import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useStore from "../hooks/useStore";

const ExtractStore = () => {
  const { store, setStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isStoreValid, setIsStoreValid] = useState(true);
  const pathname = window.location.pathname;
  const storeName = pathname.split("/")[1]; // Extract the 'name' parameter from the URL

  useEffect(() => {
    setStore(storeName);
    console.log(store);
    setIsLoading(false);
  }, [store]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : isStoreValid ? (
    <Outlet />
  ) : (
    <Navigate to={`/${store}`} />
  );
};

export default ExtractStore;
