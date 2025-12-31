import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * API Client Configuration
 */
export interface ApiClientConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Create an Axios instance with configuration
 */
export const createApiClient = (config: ApiClientConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout || 30000,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  // Request interceptor for adding auth token
  client.interceptors.request.use(
    (config) => {
      const token = getStoredToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for handling errors
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        clearStoredToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

/**
 * Token storage helpers
 */
let memoryToken: string | null = null;

export const setToken = (token: string | null) => {
  memoryToken = token;
  if (typeof window !== 'undefined') {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
  }
};

export const getStoredToken = (): string | null => {
  if (memoryToken) return memoryToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const clearStoredToken = () => {
  memoryToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

/**
 * Default API client instance
 */
let defaultClient: AxiosInstance | null = null;

export const getApiClient = (): AxiosInstance => {
  if (!defaultClient) {
    throw new Error('API client not initialized. Use ApiProvider to initialize.');
  }
  return defaultClient;
};

export const setDefaultClient = (client: AxiosInstance) => {
  defaultClient = client;
};
