import type { AxiosInstance } from 'axios';
import type { UseLoginInput, UseLoginResponse } from './types';

export const loginRequest = async (
  client: AxiosInstance,
  input: UseLoginInput
): Promise<UseLoginResponse> => {
  const response = await client.post<UseLoginResponse>('/api/auth/login', input);
  return response.data;
};

