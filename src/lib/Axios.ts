import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AuthStateModule } from '@/store/modules/AuthState';

const BASE_URL = 'http://localhost:3001';

const _axios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});

const REQUEST_HEADER: () => AxiosRequestConfig = () => ({
  headers: {
    'X-Session-Id': AuthStateModule.session.isAuthenticated
      ? AuthStateModule.session.id
      : '',
    'X-Session-Cert': AuthStateModule.session.isAuthenticated
      ? AuthStateModule.session.cert
      : ''
  }
});

function prepareConfig(
  config?: AxiosRequestConfig
): AxiosRequestConfig | undefined {
  return { ...config, ...REQUEST_HEADER() };
}

const Axios: {
  get: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse | undefined>;
  delete: (
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse | undefined>;
  post: <T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse | undefined>;
} = {
  get: (url, config?: AxiosRequestConfig) => {
    return _axios.get(url, prepareConfig(config));
  },
  delete: (url, config?: AxiosRequestConfig) => {
    return _axios.delete(url, prepareConfig(config));
  },
  post: <T>(url: string, data?: T, config?: AxiosRequestConfig) => {
    return _axios.post(url, data, prepareConfig(config));
  }
};

export default Axios;
