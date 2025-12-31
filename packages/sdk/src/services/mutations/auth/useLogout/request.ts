import { setToken } from '@/client';

export const logoutRequest = async (): Promise<void> => {
  setToken(null);
};

