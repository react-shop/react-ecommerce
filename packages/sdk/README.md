### @react-shop/sdk

Complete SDK for the React Ecommerce Platform with React context providers, API client, and React Query hooks.

## Features

- 🔌 **React Context Providers** - Easy setup with ApiProvider and QueryProvider
- 🌐 **Axios Client** - Pre-configured HTTP client with interceptors
- ⚡ **React Query Integration** - Hooks for data fetching and caching
- 🔒 **Auth Management** - Built-in token storage and refresh
- 🎯 **Service-Based Architecture** - Organized by domain (auth, products, cart, etc.)
- 📝 **TypeScript** - Full type safety

## Installation

```bash
yarn add @react-shop/sdk
```

## Quick Start

### 1. Setup Providers

Wrap your app with the SDK provider:

```typescript
// app/layout.tsx (Next.js App Router)
import { SdkProvider } from '@react-shop/sdk';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SdkProvider
          apiConfig={{
            baseURL: 'http://localhost:3001/graphql',
            timeout: 30000,
          }}
        >
          {children}
        </SdkProvider>
      </body>
    </html>
  );
}
```

Or use individual providers:

```typescript
import { ApiProvider, QueryProvider } from '@react-shop/sdk';

function App({ children }) {
  return (
    <ApiProvider config={{ baseURL: 'http://localhost:3001/graphql' }}>
      <QueryProvider>
        {children}
      </QueryProvider>
    </ApiProvider>
  );
}
```

### 2. Use Service Hooks

```typescript
import { useLogin, useMe } from '@react-shop/sdk';

function LoginForm() {
  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      console.log('Logged in:', data.user);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}

function UserProfile() {
  const { data, isLoading } = useMe();

  if (isLoading) return <div>Loading...</div>;

  return <div>Welcome, {data?.firstName}!</div>;
}
```

### 3. Use API Client Directly

```typescript
import { useApiClient } from '@react-shop/sdk';

function CustomComponent() {
  const { client } = useApiClient();

  const fetchCustomData = async () => {
    const response = await client.post('', {
      query: `query { customData { id } }`,
    });
    return response.data;
  };

  return <button onClick={fetchCustomData}>Fetch</button>;
}
```

## API Reference

### Providers

#### SdkProvider

Combined provider that includes both API and Query providers:

```typescript
<SdkProvider
  apiConfig={{
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
  }}
  queryClient?: QueryClient
>
  {children}
</SdkProvider>
```

#### ApiProvider

Provides Axios instance:

```typescript
<ApiProvider
  config={{
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
  }}
>
  {children}
</ApiProvider>
```

#### QueryProvider

Provides React Query client:

```typescript
<QueryProvider client?: QueryClient>
  {children}
</QueryProvider>
```

### Hooks

#### useApiClient

Access the Axios instance:

```typescript
const { client } = useApiClient();

// Make requests
const response = await client.get('/endpoint');
const response = await client.post('/endpoint', data);
```

#### useQueryClient

Access React Query client:

```typescript
import { useQueryClient } from '@react-shop/sdk';

const queryClient = useQueryClient();

// Invalidate queries
queryClient.invalidateQueries({ queryKey: ['products'] });

// Set cache data
queryClient.setQueryData(['cart'], newData);
```

### Token Management

```typescript
import { setToken, getStoredToken, clearStoredToken } from '@react-shop/sdk';

// Set token (stores in memory and localStorage)
setToken('your-access-token');

// Get current token
const token = getStoredToken();

// Clear token
clearStoredToken();
```

## Services

### Auth Service

```typescript
import {
  useMe,
  useLogin,
  useRegister,
  useLogout,
  useRequestPasswordReset,
  useResetPassword,
} from '@react-shop/sdk';
```

**Queries:**
- `useMe()` - Get current user

**Mutations:**
- `useLogin({ email, password })` - Login
- `useRegister({ email, password, firstName, lastName })` - Register
- `useLogout()` - Logout
- `useRequestPasswordReset({ email })` - Request password reset
- `useResetPassword({ token, newPassword })` - Reset password

### Example: Authentication Flow

```typescript
function AuthExample() {
  const { data: user } = useMe();
  const { mutate: login } = useLogin({
    onSuccess: () => {
      toast.success('Logged in!');
    },
  });
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      toast.success('Logged out!');
      router.push('/login');
    },
  });

  if (!user) {
    return <button onClick={() => login({ email, password })}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user.firstName}!</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

## Architecture

```
@react-shop/sdk/
├── providers/
│   ├── ApiProvider.tsx      # Axios client provider
│   ├── QueryProvider.tsx    # React Query provider
│   └── SdkProvider.tsx      # Combined provider
├── services/
│   ├── auth/
│   │   ├── queries.ts       # useMe()
│   │   └── mutations.ts     # useLogin(), useRegister(), etc.
│   └── index.ts
├── client.ts                # API client configuration
└── index.ts                 # Main exports
```

## Benefits of This Architecture

### 1. Clean Separation
- **Providers** - Setup and configuration
- **Services** - API operations organized by domain
- **Client** - Low-level HTTP configuration

### 2. Flexibility
```typescript
// Use the SDK provider (recommended)
<SdkProvider apiConfig={{ baseURL: '...' }}>

// Or compose your own
<ApiProvider config={...}>
  <QueryProvider>
    <YourCustomProvider>
      <App />
    </YourCustomProvider>
  </QueryProvider>
</ApiProvider>
```

### 3. Automatic Token Management
- Tokens stored automatically on login
- Added to requests via interceptors
- Cleared on logout or 401 errors

### 4. Type Safety
All hooks and clients are fully typed with TypeScript.

## Advanced Usage

### Custom Query Configuration

```typescript
const { data } = useMe({
  staleTime: 1000 * 60 * 10, // 10 minutes
  gcTime: 1000 * 60 * 30, // 30 minutes
  refetchOnWindowFocus: false,
  retry: 3,
});
```

### Request/Response Interceptors

The API client includes built-in interceptors:

**Request Interceptor:**
- Automatically adds Authorization header
- Reads token from storage

**Response Interceptor:**
- Handles 401 errors
- Clears tokens and redirects to login

### Custom Axios Configuration

```typescript
import { createApiClient } from '@react-shop/sdk';

const customClient = createApiClient({
  baseURL: 'https://api.example.com',
  timeout: 60000,
  headers: {
    'X-Custom-Header': 'value',
  },
});
```

## Migration from Old Structure

If migrating from the previous `@react-shop/services` package:

**Before:**
```typescript
import { useLogin } from '@react-shop/services';
import { initializeClient } from '@react-shop/services';

initializeClient('http://localhost:3001/graphql');
```

**After:**
```typescript
import { useLogin, SdkProvider } from '@react-shop/sdk';

<SdkProvider apiConfig={{ baseURL: 'http://localhost:3001/graphql' }}>
  <App />
</SdkProvider>
```

## Adding New Services

To add a new service (e.g., products):

```typescript
// src/services/products/queries.ts
import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';

export const useProducts = () => {
  const { client } = useApiClient();
  
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await client.post('', {
        query: `query { products { id name price } }`,
      });
      return data.data.products;
    },
  });
};

// src/services/products/mutations.ts
import { useMutation } from '@tanstack/react-query';
import { useApiClient } from '../../providers/ApiProvider';

export const useCreateProduct = () => {
  const { client } = useApiClient();
  
  return useMutation({
    mutationFn: async (input) => {
      const { data } = await client.post('', {
        query: `mutation CreateProduct($input: CreateProductInput!) {
          createProduct(input: $input) { id }
        }`,
        variables: { input },
      });
      return data.data.createProduct;
    },
  });
};

// src/services/products/index.ts
export * from './queries';
export * from './mutations';

// src/services/index.ts
export * from './auth';
export * from './products'; // Add new service
```

## License

MIT
