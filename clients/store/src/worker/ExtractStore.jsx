import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import useStore from '../hooks/useStore';
import { Navigate, Outlet } from 'react-router-dom';
import useAxiosWithStore from '../api/apiHooks/useAxiosWithStore';
import { getStoreDesign } from '../services/webDesignService';
import { addStoreVisit } from '../services/visitsService';
import { setupSite } from '../redux/webDesign/webDesignSlice';
import LandingPage from '../pages/landingPage/LandingPage';

const ExtractStore = () => {
  const dispatch = useDispatch();
  const { store, setStore, isStoreValid, setIsStoreValid } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const pathname = window.location.pathname;
  const storeName = pathname.split('/')[1]; // Extract the 'name' parameter from the URL
  const axios = useAxiosWithStore(storeName);

  const getDesign = async () => {
    try {
      if (storeName) {
        const design = await getStoreDesign(axios, storeName);
        if (design && !design?.message) {
          setIsStoreValid(true);
          // await updateStoreVisit();
        }
        dispatch(setupSite(design));
      }
    } catch (error) {
      // console.log(error);
    }
  };
  const updateStoreVisit = async () => {
    try {
      const visitorToken = Cookies.get('nivwo4');
      if (!visitorToken) {
        const newVisitorToken = 'nivwo4';
        Cookies.set('nivwo4', newVisitorToken, { expires: 365 }); // Store the token for a year
        await addStoreVisit(axios, true);
      } else {
        await addStoreVisit(axios, false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    if (storeName !== 'home') setStore(storeName);
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
