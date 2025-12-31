/**
 * Auth Service - Mutations
 */
import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';
import { setToken, clearStoredToken } from '../../client';
import type { User } from './queries';

// Types
export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

// Mutations
export const useLogin = (
  options?: Omit<UseMutationOptions<AuthPayload, Error, LoginInput>, 'mutationFn'>
) => {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<AuthPayload, Error, LoginInput>({
    mutationFn: async (input) => {
      const { data } = await client.post('', {
        query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              accessToken
              refreshToken
              user {
                id
                email
                firstName
                lastName
                role
              }
            }
          }
        `,
        variables: input,
      });
      return data.data.login;
    },
    onSuccess: (data) => {
      // Store tokens
      setToken(data.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      
      // Cache user data
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
    ...options,
  });
};

export const useRegister = (
  options?: Omit<UseMutationOptions<AuthPayload, Error, RegisterInput>, 'mutationFn'>
) => {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<AuthPayload, Error, RegisterInput>({
    mutationFn: async (input) => {
      const { data } = await client.post('', {
        query: `
          mutation Register($input: RegisterInput!) {
            register(input: $input) {
              accessToken
              refreshToken
              user {
                id
                email
                firstName
                lastName
                role
              }
            }
          }
        `,
        variables: { input },
      });
      return data.data.register;
    },
    onSuccess: (data) => {
      setToken(data.accessToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      queryClient.setQueryData(['auth', 'me'], data.user);
    },
    ...options,
  });
};

export const useLogout = (
  options?: Omit<UseMutationOptions<boolean, Error, void>, 'mutationFn'>
) => {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, void>({
    mutationFn: async () => {
      const { data } = await client.post('', {
        query: `
          mutation Logout {
            logout
          }
        `,
      });
      return data.data.logout;
    },
    onSuccess: () => {
      clearStoredToken();
      queryClient.clear();
    },
    ...options,
  });
};

export const useRequestPasswordReset = (
  options?: Omit<UseMutationOptions<boolean, Error, { email: string }>, 'mutationFn'>
) => {
  const { client } = useApiClient();

  return useMutation<boolean, Error, { email: string }>({
    mutationFn: async ({ email }) => {
      const { data } = await client.post('', {
        query: `
          mutation RequestPasswordReset($email: String!) {
            requestPasswordReset(email: $email)
          }
        `,
        variables: { email },
      });
      return data.data.requestPasswordReset;
    },
    ...options,
  });
};

export const useResetPassword = (
  options?: Omit<
    UseMutationOptions<boolean, Error, { token: string; newPassword: string }>,
    'mutationFn'
  >
) => {
  const { client } = useApiClient();

  return useMutation<boolean, Error, { token: string; newPassword: string }>({
    mutationFn: async ({ token, newPassword }) => {
      const { data } = await client.post('', {
        query: `
          mutation ResetPassword($token: String!, $newPassword: String!) {
            resetPassword(token: $token, newPassword: $newPassword)
          }
        `,
        variables: { token, newPassword },
      });
      return data.data.resetPassword;
    },
    ...options,
  });
};

