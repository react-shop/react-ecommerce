# SDK Usage Examples

Complete examples showing how to use the SDK in your React application.

## Setup

### 1. Basic Setup (Next.js App Router)

```typescript
// app/layout.tsx
import { SdkProvider } from '@react-shop/sdk';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SdkProvider
          apiConfig={{
            baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/graphql',
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

### 2. Advanced Setup with Custom Configuration

```typescript
// app/providers.tsx
'use client';

import { SdkProvider, createQueryClient } from '@react-shop/sdk';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Create query client once per component lifecycle
  const [queryClient] = useState(() =>
    createQueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          gcTime: 1000 * 60 * 30,
        },
      },
    })
  );

  return (
    <SdkProvider
      apiConfig={{
        baseURL: process.env.NEXT_PUBLIC_API_URL!,
        headers: {
          'X-App-Version': '1.0.0',
        },
      }}
      queryClient={queryClient}
    >
      {children}
    </SdkProvider>
  );
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Authentication Examples

### Login Form

```typescript
'use client';

import { useState } from 'react';
import { useLogin, setToken } from '@react-shop/sdk';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const { mutate: login, isPending, error } = useLogin({
    onSuccess: (data) => {
      // Tokens are automatically stored
      console.log('Logged in as:', data.user.email);
      router.push('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      {error && (
        <div className="text-red-600">
          {error.message}
        </div>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Register Form

```typescript
'use client';

import { useRegister } from '@react-shop/sdk';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  
  const { mutate: register, isPending } = useRegister({
    onSuccess: () => {
      router.push('/');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    register({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="firstName" placeholder="First Name" required />
      <input name="lastName" placeholder="Last Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
}
```

### User Profile Component

```typescript
'use client';

import { useMe, useLogout } from '@react-shop/sdk';
import { useRouter } from 'next/navigation';

export function UserProfile() {
  const router = useRouter();
  const { data: user, isLoading, error } = useMe();
  
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      router.push('/login');
    },
  });

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="space-y-4">
      <h2>Welcome, {user.firstName}!</h2>
      <dl>
        <dt>Email:</dt>
        <dd>{user.email}</dd>
        <dt>Role:</dt>
        <dd>{user.role}</dd>
        <dt>Member since:</dt>
        <dd>{new Date(user.createdAt).toLocaleDateString()}</dd>
      </dl>
      <button onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
```

### Protected Route (Middleware)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  // Protected routes
  const protectedPaths = ['/dashboard', '/account', '/checkout'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/account/:path*', '/checkout/:path*'],
};
```

## Using the API Client Directly

### Custom GraphQL Query

```typescript
'use client';

import { useApiClient, useQuery } from '@react-shop/sdk';

interface CustomData {
  id: string;
  name: string;
}

export function CustomComponent() {
  const { client } = useApiClient();

  const { data, isLoading } = useQuery<CustomData[]>({
    queryKey: ['customData'],
    queryFn: async () => {
      const response = await client.post('', {
        query: `
          query GetCustomData {
            customData {
              id
              name
            }
          }
        `,
      });
      return response.data.data.customData;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Custom Mutation with Optimistic Update

```typescript
'use client';

import { useApiClient, useMutation, useQueryClient } from '@react-shop/sdk';

export function OptimisticExample() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  const { mutate: updateItem } = useMutation({
    mutationFn: async (id: string) => {
      const response = await client.post('', {
        query: `
          mutation UpdateItem($id: ID!) {
            updateItem(id: $id) {
              id
              status
            }
          }
        `,
        variables: { id },
      });
      return response.data.data.updateItem;
    },
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['items'] });

      // Snapshot previous value
      const previous = queryClient.getQueryData(['items']);

      // Optimistically update
      queryClient.setQueryData(['items'], (old: any) =>
        old.map((item: any) =>
          item.id === id ? { ...item, status: 'updated' } : item
        )
      );

      // Return context for rollback
      return { previous };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(['items'], context.previous);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  return <button onClick={() => updateItem('item-1')}>Update Item</button>;
}
```

## Authentication Context (Optional)

Create a custom auth context on top of the SDK:

```typescript
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useMe } from '@react-shop/sdk';
import type { User } from '@react-shop/sdk';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useMe({
    retry: false,
    // Only run if there's a token
    enabled: typeof window !== 'undefined' && !!localStorage.getItem('accessToken'),
  });

  const value: AuthContextType = {
    user: data || null,
    isLoading,
    isAuthenticated: !!data,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage in layout:
// <SdkProvider apiConfig={...}>
//   <AuthProvider>
//     {children}
//   </AuthProvider>
// </SdkProvider>
```

## Error Handling

### Global Error Boundary

```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-800 font-bold">Something went wrong</h2>
          <p className="text-red-600">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### API Error Handling

```typescript
'use client';

import { useLogin } from '@react-shop/sdk';
import { toast } from 'your-toast-library';

export function LoginWithToast() {
  const { mutate: login } = useLogin({
    onError: (error: any) => {
      // Handle different error types
      if (error.response?.status === 401) {
        toast.error('Invalid email or password');
      } else if (error.response?.status === 429) {
        toast.error('Too many attempts. Please try again later.');
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timeout. Please check your connection.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    },
    onSuccess: () => {
      toast.success('Successfully logged in!');
    },
  });

  return <button onClick={() => login({ email, password })}>Login</button>;
}
```

## Testing

### Mock SDK in Tests

```typescript
// __mocks__/@react-shop/sdk.tsx
import { ReactNode } from 'react';

export const SdkProvider = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const useLogin = () => ({
  mutate: jest.fn(),
  isPending: false,
  error: null,
});

export const useMe = () => ({
  data: { id: '1', email: 'test@example.com', role: 'CUSTOMER' },
  isLoading: false,
  error: null,
});
```

### Test Component

```typescript
// LoginForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginForm } from './LoginForm';

jest.mock('@react-shop/sdk');

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('calls login mutation on submit', () => {
    const { useLogin } = require('@react-shop/sdk');
    const mockLogin = jest.fn();
    useLogin.mockReturnValue({ mutate: mockLogin, isPending: false });

    render(<LoginForm />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/graphql
NEXT_PUBLIC_APP_ENV=development
```

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@react-shop/sdk": ["./packages/sdk/src"]
    }
  }
}
```

## Best Practices

1. **Always wrap your app with SdkProvider**
2. **Use the SDK hooks instead of calling the API directly**
3. **Handle loading and error states**
4. **Implement optimistic updates for better UX**
5. **Clear tokens on logout**
6. **Use TypeScript for type safety**
7. **Test your components with mocked SDK**

## Next Steps

- Check the [full README](./README.md) for more details
- See the [services documentation](../../apps/docs/services_package.md)
- Explore [authentication guide](../../apps/docs/authentication.md)

