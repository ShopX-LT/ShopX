import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Box, Container } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Nav from '../components/nav/Nav';
import { useSelector } from 'react-redux';

const LegacyLayout = () => {
  const bgDesign = useSelector((state) => state.webDesign.mainBackgroundColor);

  return (
    <Box sx={{ minHeight: '100vh' }}>
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
      <Nav navStyle="legacy" />
      <Box sx={{ minHeight: '100vh', overflow: 'auto', background: bgDesign }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LegacyLayout;
