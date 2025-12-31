/**
 * @react-shop/sdk
 * Complete SDK for React Ecommerce Platform
 */

// Providers
export * from './providers';

// Client utilities
export { setToken, getStoredToken, clearStoredToken, getApiClient } from './client';

// Services (API hooks)
export * from './services';

// Re-export React Query utilities
export {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryClient,
} from '@tanstack/react-query';
