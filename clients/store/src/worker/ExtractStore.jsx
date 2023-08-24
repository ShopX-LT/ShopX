import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useStore from '../hooks/useStore';
import { Navigate, Outlet } from 'react-router-dom';
import useAxiosWithStore from '../api/apiHooks/useAxiosWithStore';
import { getStoreDesign } from '../services/webDesignService';
import { setupSite } from '../redux/webDesign/webDesignSlice';

const ExtractStore = () => {
  const dispatch = useDispatch();
  const { store, setStore, isStoreValid, setIsStoreValid } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = window.location.pathname;
  const storeName = pathname.split('/')[1]; // Extract the 'name' parameter from the URL
  const axios = useAxiosWithStore(storeName);

  const getDesign = async () => {
    try {
      const design = await getStoreDesign(axios, storeName);
      if (design) {
        setIsStoreValid(true);
      }
      dispatch(setupSite(design));
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    setStore(storeName);
  }, [storeName]);
  useEffect(() => {
    getDesign();
    setIsLoading(false);
  }, [store]);

  const renderPage = () => {
    if (isLoading) {
      return <p>Loading ...</p>;
    } else if (isStoreValid) {
      return <Outlet />;
    } else {
      return <Navigate to={''} />;
    }
  };

  return <div>{isLoading ? <p>Loading ...</p> : isStoreValid ? <Outlet /> : <></>}</div>;
};

export default ExtractStore;
