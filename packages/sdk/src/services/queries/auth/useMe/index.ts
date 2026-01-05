import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '@providers/ApiProvider';
import { useMeKey } from './key';
import { fetchMe } from './request';
import { getStoredToken } from '../../../../client';

export function useMe() {
  const { client } = useApiClient();
  const hasToken = !!getStoredToken();

  return useQuery({
    queryKey: useMeKey(),
    queryFn: () => fetchMe(client),
    retry: false,
    enabled: hasToken, // Only fetch if user has a token
  });
}

export * from './types';
export * from './key';

