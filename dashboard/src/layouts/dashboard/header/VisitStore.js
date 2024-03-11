import { Button } from '@mui/material';
import React from 'react';
import { getStoreName } from '../../../services/UtilityService';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const VisitStore = () => {
  const axiosPrivate = useAxiosPrivate();
  const handleVisitMyStoreClicked = async () => {
    const storeName = await getStoreName(axiosPrivate);
    if (storeName) {
      window.open(`https://myshopx.net/${storeName}`);
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={handleVisitMyStoreClicked}>
        Visit My Store
      </Button>
    </div>
  );
};

export default VisitStore;
