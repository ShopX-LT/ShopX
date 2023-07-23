import axios from 'axios';

// const BASE_URL = 'http://localhost:3001';
// const BASE_URL = 'http://178.128.171.90:3001';
const BASE_URL = 'https://myshopx.net';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
