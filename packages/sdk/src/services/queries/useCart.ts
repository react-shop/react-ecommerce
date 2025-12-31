import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Cart } from '../../entities';

/**
 * Hook to get the current user's cart
 */
export function useCart() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await client.get<Cart>('/api/cart');
      return response.data;
    },
  });
}

