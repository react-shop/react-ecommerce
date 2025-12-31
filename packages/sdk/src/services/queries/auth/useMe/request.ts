import type { AxiosInstance } from 'axios';
import type { UseMeResponse } from './types';

export const fetchMe = async (client: AxiosInstance): Promise<UseMeResponse> => {
  const response = await client.get<UseMeResponse>('/api/users/me');
  return response.data;
};

