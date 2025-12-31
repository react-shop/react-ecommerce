# Authentication Flow

This document explains how authentication and token management works in the SDK.

## Overview

The SDK provides a complete authentication system with:
- JWT-based authentication (access + refresh tokens)
- Automatic token refresh on expiration
- Request queuing during token refresh
- Persistent token storage (localStorage + memory)

## Token Storage

Tokens are stored in two places:
1. **Memory** - For server-side rendering and runtime
2. **localStorage** - For persistence across page refreshes

### Storage Functions

```typescript
import { setToken, setRefreshToken, getStoredToken, getStoredRefreshToken, clearStoredToken } from '@react-shop/sdk';

// Save tokens
setToken('eyJhbGciOi...');
setRefreshToken('eyJhbGciOi...');

// Retrieve tokens
const accessToken = getStoredToken();
const refreshToken = getStoredRefreshToken();

// Clear all tokens (logout)
clearStoredToken();
```

## Authentication Hooks

### Login

```typescript
import { useLogin } from '@react-shop/sdk';

function LoginForm() {
  const login = useLogin();

  const handleSubmit = async (email: string, password: string) => {
    try {
      const result = await login.mutateAsync({ email, password });
      console.log('Logged in:', result.user);
      // Tokens are automatically saved
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit('user@example.com', 'password123');
    }}>
      {/* form fields */}
    </form>
  );
}
```

### Register

```typescript
import { useRegister } from '@react-shop/sdk';

function RegisterForm() {
  const register = useRegister();

  const handleSubmit = async (data) => {
    try {
      const result = await register.mutateAsync({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      console.log('Registered:', result.user);
      // Tokens are automatically saved
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return <form>{/* form fields */}</form>;
}
```

### Logout

```typescript
import { useLogout } from '@react-shop/sdk';

function LogoutButton() {
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      // Tokens are automatically cleared
      // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Get Current User

```typescript
import { useMe } from '@react-shop/sdk';

function UserProfile() {
  const { data: user, isLoading, error } = useMe();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>Welcome, {user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

## Automatic Token Refresh

The SDK automatically handles token refresh when the access token expires.

### How It Works

1. **Request Made** - A request is sent with the access token
2. **401 Response** - Server returns 401 (Unauthorized)
3. **Token Refresh** - SDK automatically:
   - Pauses all other requests
   - Sends refresh token to `/api/auth/refresh`
   - Saves new access token (and optionally new refresh token)
   - Retries the original request
   - Resumes all queued requests
4. **Success** - Request completes successfully
5. **Failure** - If refresh fails:
   - Clears all tokens
   - Redirects to `/login`

### Request Queuing

During token refresh, all subsequent 401 requests are queued and automatically retried after the new token is obtained.

```typescript
// These requests will be queued and retried automatically
const products = await client.get('/api/products');  // 401 → queued
const cart = await client.get('/api/cart');         // 401 → queued
const orders = await client.get('/api/orders');      // 401 → queued

// After token refresh, all requests retry automatically
```

## Token Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                       User Login/Register                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │  Save Access Token     │
        │  Save Refresh Token    │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   User Makes Request   │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │ Add Bearer Token to    │◄──────────┐
        │   Authorization Header │           │
        └────────────┬───────────┘           │
                     │                       │
                     ▼                       │
        ┌────────────────────────┐           │
        │  Server Validates Token│           │
        └────────────┬───────────┘           │
                     │                       │
         ┌───────────┴────────────┐          │
         │                        │          │
    ✅ Valid              ❌ Expired (401)   │
         │                        │          │
         ▼                        ▼          │
┌─────────────┐      ┌────────────────────┐ │
│  Return     │      │ Try Token Refresh  │ │
│  Response   │      └────────┬───────────┘ │
└─────────────┘               │             │
                  ┌───────────┴───────────┐ │
                  │                       │ │
             ✅ Success            ❌ Failed│
                  │                       │ │
                  ▼                       ▼ │
      ┌───────────────────┐   ┌──────────────┐
      │ Save New Tokens   │   │ Clear Tokens │
      │ Retry Request     │   │ Redirect to  │
      └───────────┬───────┘   │   /login     │
                  │            └──────────────┘
                  └────────────────────────────┘
```

## Backend Requirements

Your backend API must implement the following endpoint:

### POST /api/auth/refresh

**Request:**
```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

**Response (Success):**
```json
{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "eyJhbGciOi..."  // Optional: can return same or new refresh token
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid or expired refresh token"
}
```

## Security Best Practices

1. **Access Token** - Short-lived (5-15 minutes)
2. **Refresh Token** - Long-lived (7-30 days)
3. **HTTPS Only** - Always use HTTPS in production
4. **Secure Storage** - localStorage is used but consider httpOnly cookies for enhanced security
5. **Token Rotation** - Backend should issue new refresh tokens on refresh

## Environment Variables

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001
```

## Testing Authentication

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useLogin } from '@react-shop/sdk';

test('login saves tokens', async () => {
  const { result } = renderHook(() => useLogin());

  await result.current.mutateAsync({
    email: 'test@example.com',
    password: 'password123',
  });

  await waitFor(() => {
    expect(getStoredToken()).toBeTruthy();
    expect(getStoredRefreshToken()).toBeTruthy();
  });
});
```

## Troubleshooting

### Token Not Being Sent

- Check that `setToken()` was called after login
- Verify token exists: `console.log(getStoredToken())`
- Check browser localStorage: `localStorage.getItem('accessToken')`

### Infinite Refresh Loop

- Check that refresh endpoint returns valid tokens
- Verify refresh token is not expired
- Ensure backend validates refresh tokens correctly

### Redirect to Login

- Happens when refresh token is invalid/expired
- User needs to login again
- Clear tokens: `clearStoredToken()`

## Example: Protected Route

```typescript
'use client';

import { useMe } from '@react-shop/sdk';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { data: user, isLoading } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return null;

  return <div>Protected content for {user.email}</div>;
}
```

## Summary

The authentication system provides:
- ✅ Automatic token management
- ✅ Seamless token refresh
- ✅ Request queuing during refresh
- ✅ Persistent storage
- ✅ Type-safe hooks
- ✅ Zero configuration needed

Just use the hooks and everything is handled automatically!

