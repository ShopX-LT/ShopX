import { useEffect } from 'react';
import { axiosAnalysis } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosAnalysis = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosAnalysis.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization) {
          config.headers.authorization = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosAnalysis.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers.authorization = `Bearer ${newToken}`;
          return axiosAnalysis(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAnalysis.interceptors.request.eject(requestIntercept);
      axiosAnalysis.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosAnalysis;
};

export default useAxiosAnalysis;
