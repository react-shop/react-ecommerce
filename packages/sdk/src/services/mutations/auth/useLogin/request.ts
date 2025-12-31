import type { AxiosInstance } from 'axios';
import { AUTH_ROUTES } from '@services/constants';
import type { UseLoginInput, UseLoginResponse } from './types';

export const loginRequest = async (
  client: AxiosInstance,
  input: UseLoginInput
): Promise<UseLoginResponse> => {
  const response = await client.post<UseLoginResponse>(AUTH_ROUTES.LOGIN, input);
  return response.data;
};

