import axios, { type InternalAxiosRequestConfig } from 'axios';
import localforage from 'localforage';
import { httpHeaders, jwtKey } from '../constants';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

const authRequestHandler = async (config: InternalAxiosRequestConfig) => {
  const { headers } = config;
  if (typeof headers === 'object' && httpHeaders.internal.authenticate in headers) {
    try {
      const token = await localforage.getItem<string | null>(jwtKey);

      if (token !== null) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      delete config.headers?.[httpHeaders.internal.authenticate];
    } catch (e) {
      // TODO: Logout user??
    }
  }

  return config;
};

axiosInstance.interceptors.request.use(authRequestHandler, async (error) => {
  return await Promise.reject(error);
});

export { axiosInstance };
