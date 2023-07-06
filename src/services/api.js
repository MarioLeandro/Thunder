import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.34.134.6:3001',
  validateStatus: (status) => 200 <= status < 300,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
