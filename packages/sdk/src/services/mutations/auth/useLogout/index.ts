import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutRequest } from './request';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

export * from './types';
export * from './key';

