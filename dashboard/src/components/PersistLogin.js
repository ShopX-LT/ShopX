/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------
export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        // eslint-disable-next-line no-unused-expressions
        isMounted && setIsLoading(false);
      }
    };

    // eslint-disable-next-line no-unused-expressions
    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    // eslint-disable-next-line no-return-assign
    return () => (isMounted = false);
  }, []);
  return <Box>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</Box>;
}
