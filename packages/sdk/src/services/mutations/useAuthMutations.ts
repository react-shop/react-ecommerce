import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import { setToken } from '../../client';
import type { AuthResponse, LoginInput, RegisterInput } from '../../entities';

/**
 * Hook for user login
 */
export function useLogin() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const response = await client.post<AuthResponse>('/api/auth/login', input);
      return response.data;
    },
    onSuccess: (data) => {
      // Store token
      setToken(data.accessToken);
      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      // Set user data in cache
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
}

/**
 * Hook for user registration
 */
export function useRegister() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const response = await client.post<AuthResponse>('/api/auth/register', input);
      return response.data;
    },
    onSuccess: (data) => {
      // Store token
      setToken(data.accessToken);
      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      // Set user data in cache
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear token
      setToken(null);
      // Clear all queries
      queryClient.clear();
    },
  });
}

