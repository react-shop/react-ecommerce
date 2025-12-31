import { setToken } from '@sdk/client';

export const logoutRequest = async (): Promise<void> => {
  setToken(null);
};

