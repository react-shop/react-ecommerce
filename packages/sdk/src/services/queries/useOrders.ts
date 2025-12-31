import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Order } from '../../entities';

/**
 * Hook to get all orders for the current user
 */
export function useOrders() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await client.get<Order[]>('/api/orders');
      return response.data;
    },
  });
}

/**
 * Hook to get a single order by ID
 */
export function useOrder(id: string) {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const response = await client.get<Order>(`/api/orders/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to get all orders (admin only)
 */
export function useAllOrders() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: async () => {
      const response = await client.get<Order[]>('/api/orders/admin/all');
      return response.data;
    },
  });
}

