import { useLocation, Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.token ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default RequireAuth;
