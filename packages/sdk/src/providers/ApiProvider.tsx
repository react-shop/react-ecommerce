/**
 * API Provider
 * Provides Axios instance throughout the application
 */
'use client';

import * as React from 'react';
import { createContext, useContext, useMemo } from 'react';
import type { AxiosInstance } from 'axios';
import { createApiClient, setDefaultClient, type ApiClientConfig } from '../client';

interface ApiContextValue {
  client: AxiosInstance;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

export interface ApiProviderProps {
  config: ApiClientConfig;
  children: React.ReactNode;
}

/**
 * Provider component for API client
 * 
 * @example
 * ```tsx
 * <ApiProvider config={{ baseURL: 'http://localhost:3001/graphql' }}>
 *   <App />
 * </ApiProvider>
 * ```
 */
export function ApiProvider({ config, children }: ApiProviderProps) {
  const client = useMemo(() => {
    const apiClient = createApiClient(config);
    setDefaultClient(apiClient);
    return apiClient;
  }, [config.baseURL]); // Only recreate if baseURL changes

  const value = useMemo(() => ({ client }), [client]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

/**
 * Hook to access the API client
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { client } = useApiClient();
 *   
 *   const fetchData = async () => {
 *     const response = await client.get('/endpoint');
 *     return response.data;
 *   };
 * }
 * ```
 */
export function useApiClient(): ApiContextValue {
  const context = useContext(ApiContext);
  
  if (!context) {
    throw new Error('useApiClient must be used within ApiProvider');
  }
  
  return context;
}

