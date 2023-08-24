import { axiosWithStore } from '../axios';
import useStore from '../../hooks/useStore';
import { useEffect } from 'react';

const useAxiosWithStore = (storeName) => {
  const { store } = useStore();

  useEffect(() => {
    axiosWithStore.interceptors.request.use((config) => {
      config.headers['store'] = store || storeName;
      return config;
    });
  }, [store]);
  return axiosWithStore;
};
export default useAxiosWithStore;
