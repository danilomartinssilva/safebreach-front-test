import axios from 'axios';

const TIMEOUT = 1000;

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: TIMEOUT,
});

export default instance;
