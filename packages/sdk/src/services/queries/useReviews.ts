import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Review } from '../../entities';

/**
 * Hook to get reviews for a specific product
 */
export function useProductReviews(productId: string) {
  const { client } = useApiClient();

  return useQuery({
    queryKey: ['reviews', 'product', productId],
    queryFn: async () => {
      const response = await client.get<Review[]>(`/api/reviews/product/${productId}`);
      return response.data;
    },
    enabled: !!productId,
  });
}

