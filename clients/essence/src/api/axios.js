import axios from "axios";
import useStyle from "../hooks/useStyle";

const BASE_URL = "http://shopxlb-256928536.us-east-1.elb.amazonaws.com:3001";
// const BASE_URL = "http://localhost:3001";
// const { store } = useStyle();
// const STORE = store.store;
export default axios.create({
  baseURL: BASE_URL,
  headers: { store: "tshop" },
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
