import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Category } from '../../entities';

/**
 * Hook to get all categories
 */
export function useCategories() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await client.get<Category[]>('/api/categories');
      return response.data;
    },
  });
}

/**
 * Hook to get a single category by ID
 */
export function useCategory(id: string) {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['categories', id],
    queryFn: async () => {
      const response = await client.get<Category>(`/api/categories/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

