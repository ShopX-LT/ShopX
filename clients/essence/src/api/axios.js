import axios from "axios";
const BASE_URL = "http://178.128.171.90:3001";
export default axios.create({
  baseURL: BASE_URL,
  headers: { store: "tshop" },
});

export const axiosWithStore = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
