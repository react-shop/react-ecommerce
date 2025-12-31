/**
 * Auth Service - Queries
 */
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';

// Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Query: Get current user (me)
export const useMe = (options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>) => {
  const { client } = useApiClient();

  return useQuery<User>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await client.post('', {
        query: `
          query Me {
            me {
              id
              email
              firstName
              lastName
              phone
              role
              createdAt
              updatedAt
            }
          }
        `,
      });
      return data.data.me;
    },
    ...options,
  });
};

