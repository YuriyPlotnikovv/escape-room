import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {Token} from './token';
import {BASE_URL, HttpResponses, REQUEST_TIMEOUT} from '../const/const';

declare module 'axios' {
  export interface AxiosRequestConfig {
    errorHandler?: string;
  }
}

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get();

      if (!config.headers) {
        config.headers = {};
      }

      if (token) {
        config.headers['X-Token'] = token;
      }

      return config;
    });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      toast.dismiss();

      const config = error.config || {};
      if (config.errorHandler === 'silent' && error.response?.status === 401) {
        return Promise.reject(error);
      }

      if (!error.response) {
        toast.warn('Сервер недоступен. Попробуйте позже.');
      } else if (error.response?.status === HttpResponses.ValidationError) {
        toast.warn('Ошибка валидации. Проверьте корректность введенных данных.');
      } else if (error.response?.status === HttpResponses.CommonError) {
        toast.warn('Ошибка авторизации. Попробуйте заново авторизоваться в приложении.');
      } else if (error.response?.status === HttpResponses.NotFound) {
        toast.warn('Квест с данным ID не найден.');
      } else {
        toast.warn(error.message);
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApi();

