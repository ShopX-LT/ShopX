import { axiosWithStore } from "../axios";
import useStore from "../../hooks/useStore";

const useAxiosWithStore = () => {
  const { store } = useStore();
  axiosWithStore.interceptors.request.use((config) => {
    config.headers["store"] = store;
    return config;
  });
  return axiosWithStore;
};
export default useAxiosWithStore;
