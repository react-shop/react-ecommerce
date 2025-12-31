/**
 * Query Provider
 * Provides React Query client throughout the application
 */
'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider as TanStackQueryProvider } from '@tanstack/react-query';

/**
 * Create a default QueryClient instance
 */
export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        retry: 3,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
};

// Default singleton instance
let defaultQueryClient: QueryClient | null = null;

export const getQueryClient = () => {
  if (!defaultQueryClient) {
    defaultQueryClient = createQueryClient();
  }
  return defaultQueryClient;
};

export interface QueryProviderProps {
  children: React.ReactNode;
  client?: QueryClient;
}

/**
 * Provider component for React Query
 * 
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children, client }: QueryProviderProps) {
  const queryClient = React.useMemo(
    () => client || getQueryClient(),
    [client]
  );

  return (
    <TanStackQueryProvider client={queryClient}>
      {children}
    </TanStackQueryProvider>
  );
}

