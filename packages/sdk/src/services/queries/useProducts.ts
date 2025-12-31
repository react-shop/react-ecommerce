import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Product } from '../../entities';

/**
 * Hook to get all products
 */
export function useProducts() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await client.get<Product[]>('/api/products');
      return response.data;
    },
  });
}

/**
 * Hook to get a single product by ID
 */
export function useProduct(id: string) {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await client.get<Product>(`/api/products/${id}`);
      return response.data;
    },
    enabled: !!id, // Only run if ID is provided
  });
}

