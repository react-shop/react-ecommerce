/**
 * SDK Provider
 * Combines API and Query providers for easy setup
 */
'use client';

import * as React from 'react';
import { ApiProvider, type ApiProviderProps } from './ApiProvider';
import { QueryProvider, type QueryProviderProps } from './QueryProvider';

export interface SdkProviderProps {
  apiConfig: ApiProviderProps['config'];
  queryClient?: QueryProviderProps['client'];
  children: React.ReactNode;
}

/**
 * Combined provider for the entire SDK
 * Wraps both API and Query providers
 * 
 * @example
 * ```tsx
 * <SdkProvider apiConfig={{ baseURL: 'http://localhost:3001/graphql' }}>
 *   <App />
 * </SdkProvider>
 * ```
 */
export function SdkProvider({ apiConfig, queryClient, children }: SdkProviderProps) {
  return (
    <ApiProvider config={apiConfig}>
      <QueryProvider client={queryClient}>
        {children}
      </QueryProvider>
    </ApiProvider>
  );
}

