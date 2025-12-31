import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '@providers/ApiProvider';
import { useMeKey } from './key';
import { fetchMe } from './request';

export function useMe() {
  const { client } = useApiClient();

  return useQuery({
    queryKey: useMeKey(),
    queryFn: () => fetchMe(client),
    retry: false,
  });
}

export * from './types';
export * from './key';

