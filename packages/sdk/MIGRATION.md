# Migration Guide

## From @react-shop/services to @react-shop/sdk

This document explains the changes and how to migrate.

## What Changed?

### 1. Package Name
- **Old**: `@react-shop/services`
- **New**: `@react-shop/sdk`

### 2. Architecture
- **Old**: GraphQL client with graphql-request
- **New**: Axios client with React context providers

### 3. Folder Structure
- **Old**: `features/` folder
- **New**: `services/` folder

### 4. Setup Method
- **Old**: Call `initializeClient(url)` manually
- **New**: Wrap app with `<SdkProvider>`

## Changes Breakdown

### Package Structure

**Before:**
```
packages/services/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   ├── products/
│   │   └── cart/
│   ├── client.ts
│   └── query-client.ts
```

**After:**
```
packages/sdk/
├── src/
│   ├── providers/
│   │   ├── ApiProvider.tsx
│   │   ├── QueryProvider.tsx
│   │   └── SdkProvider.tsx
│   ├── services/
│   │   └── auth/
│   └── client.ts
```

### API Client

**Before (graphql-request):**
```typescript
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(endpoint);
```

**After (Axios):**
```typescript
import axios from 'axios';

const client = axios.create({
  baseURL: endpoint,
  // Automatic token injection via interceptors
});
```

### Setup

**Before:**
```typescript
import { initializeClient, queryClient, QueryClientProvider } from '@react-shop/services';

// Somewhere in your code
initializeClient('http://localhost:3001/graphql');

// In root
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

**After:**
```typescript
import { SdkProvider } from '@react-shop/sdk';

<SdkProvider apiConfig={{ baseURL: 'http://localhost:3001/graphql' }}>
  <App />
</SdkProvider>
```

### Hook Usage

**Before:**
```typescript
import { useLogin, useMe } from '@react-shop/services';

const { mutate } = useLogin();
const { data } = useMe();
```

**After:**
```typescript
import { useLogin, useMe } from '@react-shop/sdk';

const { mutate } = useLogin();
const { data } = useMe();
```

✅ Hook usage remains the same!

### Token Management

**Before:**
```typescript
import { updateClientToken } from '@react-shop/services';

updateClientToken(token);
```

**After:**
```typescript
import { setToken } from '@react-shop/sdk';

setToken(token);
// Tokens are also automatically set by login/register mutations
```

## Migration Steps

### 1. Update Package Name

```bash
# Remove old package
pnpm remove @react-shop/services

# Add new package (already in monorepo)
pnpm install
```

### 2. Update Imports

**Find and replace across your codebase:**

```typescript
// Old
import { ... } from '@react-shop/services';

// New
import { ... } from '@react-shop/sdk';
```

### 3. Update Root Layout/App

**Old setup:**
```typescript
// app/layout.tsx or _app.tsx
import { QueryClientProvider, initializeClient, queryClient } from '@react-shop/services';

initializeClient('http://localhost:3001/graphql');

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

**New setup:**
```typescript
// app/layout.tsx or _app.tsx
import { SdkProvider } from '@react-shop/sdk';

export default function RootLayout({ children }) {
  return (
    <SdkProvider apiConfig={{ baseURL: 'http://localhost:3001/graphql' }}>
      {children}
    </SdkProvider>
  );
}
```

### 4. Update Token Management

**Old:**
```typescript
import { updateClientToken } from '@react-shop/services';

// After login
updateClientToken(data.login.accessToken);

// On logout
updateClientToken(null);
```

**New:**
```typescript
import { setToken } from '@react-shop/sdk';

// After login (optional - automatically done by useLogin)
setToken(data.login.accessToken);

// On logout (optional - automatically done by useLogout)
setToken(null);
```

### 5. Update Custom API Calls (if any)

If you were using the GraphQL client directly:

**Old:**
```typescript
import { getClient } from '@react-shop/services';

const client = getClient();
const data = await client.request(query, variables);
```

**New:**
```typescript
import { useApiClient } from '@react-shop/sdk';

function MyComponent() {
  const { client } = useApiClient();
  
  const fetchData = async () => {
    const response = await client.post('', {
      query: '...',
      variables: {},
    });
    return response.data;
  };
}
```

## Benefits of New SDK

### 1. Better Developer Experience

- ✅ Single provider setup
- ✅ Automatic token management
- ✅ Built-in request/response interceptors
- ✅ TypeScript-first design

### 2. More Flexibility

- ✅ Use Axios for REST or GraphQL
- ✅ Access to low-level HTTP client
- ✅ Customizable interceptors
- ✅ Easy to extend

### 3. React Context Integration

- ✅ Proper React patterns
- ✅ No global singletons
- ✅ Easy to mock in tests
- ✅ Better tree-shaking

### 4. Automatic Error Handling

- ✅ 401 errors automatically clear tokens
- ✅ Redirects to login on auth failure
- ✅ Centralized error handling

## Breaking Changes

### 1. Import Paths

All imports must change from `@react-shop/services` to `@react-shop/sdk`.

### 2. Client Initialization

Must use `<SdkProvider>` instead of calling `initializeClient()`.

### 3. Token Function Names

- `updateClientToken()` → `setToken()`
- Added: `getStoredToken()`, `clearStoredToken()`

### 4. Client Access

- Old: `getClient()` returned GraphQLClient
- New: `useApiClient()` returns Axios instance (React hook)

## Compatibility

### What Stayed the Same

✅ All hook names (`useLogin`, `useMe`, etc.)  
✅ Hook signatures and return types  
✅ Query keys and caching behavior  
✅ TypeScript types  

### What Changed

❌ Package name  
❌ Setup method  
❌ Underlying HTTP client  
❌ Token management function names  

## Testing

Update your tests to use the new provider:

**Old:**
```typescript
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
```

**New:**
```typescript
const wrapper = ({ children }) => (
  <SdkProvider apiConfig={{ baseURL: 'http://localhost:3001/graphql' }}>
    {children}
  </SdkProvider>
);
```

## Troubleshooting

### Error: "API client not initialized"

**Solution:** Make sure you wrapped your app with `<SdkProvider>`:

```typescript
<SdkProvider apiConfig={{ baseURL: '...' }}>
  <App />
</SdkProvider>
```

### Error: "useApiClient must be used within ApiProvider"

**Solution:** Same as above, ensure `<SdkProvider>` is at the root.

### Tokens not being sent with requests

**Solution:** Tokens are automatically managed. Make sure you're using the login mutation from the SDK:

```typescript
const { mutate: login } = useLogin();
// Tokens are automatically stored on success
```

### Need to access tokens manually?

```typescript
import { getStoredToken } from '@react-shop/sdk';

const token = getStoredToken();
```

## Next Steps

1. Read the [SDK README](./README.md)
2. Check [Usage Examples](./USAGE_EXAMPLE.md)
3. Review [Services Documentation](../../apps/docs/services_package.md)

## Support

For issues or questions, check:
- [SDK Documentation](./README.md)
- [Project Documentation](../../apps/docs/)
- [Troubleshooting Guide](../../apps/docs/troubleshooting.md)

