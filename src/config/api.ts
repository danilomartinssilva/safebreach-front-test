import axios from 'axios';

const TIMEOUT = 1000;

const instance = axios.create({
  baseURL: 'http://192.168.3.15:3339/api/v1',
  timeout: TIMEOUT,
});

export default instance;
