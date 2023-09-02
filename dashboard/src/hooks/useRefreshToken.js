import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get('/api/admin/refresh', { withCredentials: true });
      setAuth((prev) => ({ ...prev, token: response.data.token }));

      return response.data.token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
