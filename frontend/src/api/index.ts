import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

export const $host: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API
});

export const $authHost: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API
});

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  return config;
};

$authHost.interceptors.request.use(authInterceptor);
