import type { AxiosInstance } from 'axios';
import type { UseRegisterInput, UseRegisterResponse } from './types';

export const registerRequest = async (
  client: AxiosInstance,
  input: UseRegisterInput
): Promise<UseRegisterResponse> => {
  const response = await client.post<UseRegisterResponse>('/api/auth/register', input);
  return response.data;
};

