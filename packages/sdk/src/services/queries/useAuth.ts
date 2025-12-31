import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { User } from '../../entities';

/**
 * Hook to get the current authenticated user
 */
export function useMe() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await client.get<User>('/api/users/me');
      return response.data;
    },
    retry: false, // Don't retry on auth failures
  });
}

