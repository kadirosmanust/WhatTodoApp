import Router from 'next/router';

import axios from 'axios';

const getCookie = (key: string) => {
  if (document) {
    const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');

    return b ? b.pop() : '';
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = getCookie('token');

    if (token) {
      config.headers['Authorization'] = token ? 'Bearer ' + token : null;
    }
    config.headers['Content-type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      Router.replace(`${process.env.BASE_PATH}/welcome`);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export const httpGet = <T>(url: string): Promise<T> => {
  return axios.get(url);
};

export const httpPost = <T>(url: string, body: any): Promise<T> => {
  return axios.post(url, body);
};
