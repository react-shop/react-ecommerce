import type { AxiosInstance } from 'axios';
import { AUTH_ROUTES } from '@services/constants';
import type { UseRegisterInput, UseRegisterResponse } from './types';

export const registerRequest = async (
  client: AxiosInstance,
  input: UseRegisterInput
): Promise<UseRegisterResponse> => {
  const response = await client.post<UseRegisterResponse>(AUTH_ROUTES.register, input);
  return response.data;
};

