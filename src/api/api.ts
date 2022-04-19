import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  // eslint-disable-next-line no-param-reassign
  config.params = {
    api_token: `${process.env.REACT_APP_API_KEY}`,
    ...config.params,
  };
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_DOMAIN}`,
  headers: {
    'Content-type': 'application/json',
  },
});

const apiClient = setupInterceptorsTo(instance);

export default apiClient;
