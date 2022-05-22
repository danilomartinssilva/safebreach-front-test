import axios from 'axios';

const TIMEOUT = 1000;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: TIMEOUT,
});

export default instance;
