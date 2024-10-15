import React, { useState } from 'react';
import { getStoreName } from '../../../services/UtilityService';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const useStoreName = () => {
  const axiosPrivate = useAxiosPrivate();

  const [storeName, setStoreName] = useState('');

  const retrieveStoreName = async () => {
    const newStoreName = await getStoreName(axiosPrivate);

    if (newStoreName) {
      setStoreName(newStoreName);
    }
  };

  return { storeName, retrieveStoreName };
};

export default useStoreName;
