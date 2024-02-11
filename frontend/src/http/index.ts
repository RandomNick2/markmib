import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios'

export const $host: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API
})

export const $authHost: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API
})

export const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = 'Token ' + localStorage.getItem('token')
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export interface Response {
  data: any,
  status: number
}