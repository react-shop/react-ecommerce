import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import type { Order, CreateOrderInput, UpdateOrderStatusInput } from '../../entities';

export function useCreateOrder() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateOrderInput) => {
      const response = await client.post<Order>('/api/orders', input);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] }); // Clear cart after order
    },
  });
}

export function useUpdateOrderStatus() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateOrderStatusInput }) => {
      const response = await client.put<Order>(`/api/orders/${id}/status`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', data.id] });
    },
  });
}

export function useCancelOrder() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await client.put<Order>(`/api/orders/${id}/cancel`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['orders', data.id] });
    },
  });
}

