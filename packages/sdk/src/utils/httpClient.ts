/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { api } from './routes.constants';
// Create a basic Axios instance to all requests (this object can be customized before making the call)
export const http = axios.create({
  baseURL: api.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface IAccessUser {
  token: string;
}

// Insert token on all requests when there is a token in the device storage
http.interceptors.request.use(async (config) => {
  const accessUser: IAccessUser = JSON.parse(localStorage.getItem('access_token'));

  if (accessUser) {
    config.headers.common.Authorization = `Bearer ${accessUser.token}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
    }

    console.log('REQUEST error', error);

    if (!error.response) {
      error.response = { data: { genericError: error } };
    }

    return Promise.reject(error);
  },
);
