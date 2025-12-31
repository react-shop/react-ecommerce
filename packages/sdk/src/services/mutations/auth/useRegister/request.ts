import type { AxiosInstance } from 'axios';
import { AUTH_ROUTES } from '@services/constants';
import type { UseRegisterInput, UseRegisterResponse } from './types';

export const registerRequest = async (
  client: AxiosInstance,
  input: UseRegisterInput
): Promise<UseRegisterResponse> => {
  const response = await client.post<UseRegisterResponse>(AUTH_ROUTES.REGISTER, input);
  return response.data;
};

