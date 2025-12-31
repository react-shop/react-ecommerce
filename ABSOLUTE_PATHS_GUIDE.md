# Absolute Paths & Route Constants Guide

## Overview

This project uses **absolute imports** across all packages and applications. This eliminates the need for complex relative paths (`../../../`) and makes the codebase more maintainable.

---

## SDK Package (`@react-shop/sdk`)

### Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@entities/*": ["src/entities/*"],
      "@providers/*": ["src/providers/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

### Route Constants

All API routes are centralized in `src/services/constants.ts`:

```typescript
export const AUTH_ROUTES = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/users/me',
} as const;

export const PRODUCT_ROUTES = {
  LIST: '/api/products',
  DETAIL: (id: string) => `/api/products/${id}`,
  CREATE: '/api/products',
  UPDATE: (id: string) => `/api/products/${id}`,
  DELETE: (id: string) => `/api/products/${id}`,
} as const;

// ... more routes
```

### Usage Examples

**Before (Relative Paths):**
```typescript
import { User } from '../../../../entities';
import { useApiClient } from '../../../../providers/ApiProvider';
import { setToken } from '../../../../client';

const response = await client.post('/api/auth/login', input);
```

**After (Absolute Paths):**
```typescript
import { User } from '@entities/User';
import { useApiClient } from '@providers/ApiProvider';
import { setToken } from '@/client';
import { AUTH_ROUTES } from '@services/constants';

const response = await client.post(AUTH_ROUTES.LOGIN, input);
```

---

## Design System (`@react-shop/design-system`)

### Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["./*"],
      "@components/*": ["components/*"],
      "@atoms/*": ["components/Atoms/*"],
      "@molecules/*": ["components/Molecules/*"],
      "@organisms/*": ["components/Organisms/*"],
      "@theme/*": ["theme/*"],
      "@utils/*": ["utils/*"]
    }
  }
}
```

### Usage Examples

**Before:**
```typescript
import { Button } from '../../components/Button';
import { colors } from '../../../theme/tokens/colors';
```

**After:**
```typescript
import { Button } from '@atoms/Button';
import { colors } from '@theme/tokens/colors';
```

---

## Web App (`apps/web`)

### Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@app/*": ["./src/app/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"]
    }
  }
}
```

### Usage Examples

```typescript
import { ProductCard } from '@components/ProductCard';
import { useProducts } from '@hooks/useProducts';
import { formatPrice } from '@utils/formatters';
```

---

## Backend (`apps/server`)

### Path Aliases

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@user/*": ["./user/*"],
      "@auth/*": ["./auth/*"],
      "@product/*": ["./product/*"],
      "@category/*": ["./category/*"],
      "@cart/*": ["./cart/*"],
      "@order/*": ["./order/*"],
      "@review/*": ["./review/*"],
      "@shared/*": ["./shared/*"],
      "@utils/*": ["./utils/*"]
    }
  }
}
```

### Usage Examples

```typescript
import { UserService } from '@user/user.service';
import { JwtAuthGuard } from '@auth/auth.guard';
import { PrismaService } from '@shared/prisma/prisma.service';
```

---

## Benefits

### 1. **Cleaner Imports**
```typescript
// ❌ Hard to read
import { User } from '../../../../../entities/User';

// ✅ Clean and clear
import { User } from '@entities/User';
```

### 2. **Easier Refactoring**
- Moving files doesn't break imports
- Path aliases remain consistent

### 3. **Better IDE Support**
- Auto-completion works better
- Go-to-definition is more reliable

### 4. **Centralized Routes**
- No hardcoded URLs scattered across files
- Easy to update API endpoints
- Type-safe route parameters

### 5. **Consistency**
- Same pattern across all packages
- Easier onboarding for new developers

---

## Rules

### ✅ DO

```typescript
// Use absolute imports for cross-folder references
import { User } from '@entities/User';
import { AUTH_ROUTES } from '@services/constants';
import { useApiClient } from '@providers/ApiProvider';
```

### ❌ DON'T

```typescript
// Don't use relative paths for cross-folder references
import { User } from '../../../entities/User';

// Don't hardcode API routes
const response = await client.post('/api/auth/login', data);
```

### ✅ ALLOWED

```typescript
// Relative imports are OK for same-folder files
import { loginRequest } from './request';
import { UseLoginInput } from './types';
import { useLoginKey } from './key';
```

---

## Adding New Routes

When adding new API endpoints, always update `packages/sdk/src/services/constants.ts`:

```typescript
export const NEW_FEATURE_ROUTES = {
  LIST: '/api/new-feature',
  DETAIL: (id: string) => `/api/new-feature/${id}`,
  CREATE: '/api/new-feature',
  UPDATE: (id: string) => `/api/new-feature/${id}`,
  DELETE: (id: string) => `/api/new-feature/${id}`,
} as const;
```

Then use it in your hooks:

```typescript
import { NEW_FEATURE_ROUTES } from '@services/constants';

const response = await client.get(NEW_FEATURE_ROUTES.LIST);
```

---

## IDE Configuration

### VS Code

Add to `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative"
}
```

### WebStorm

Settings → Editor → Code Style → TypeScript → Imports
- Check "Use paths relative to tsconfig.json"

---

## Troubleshooting

### Import not found

1. Check if path alias is defined in `tsconfig.json`
2. Restart TypeScript server in IDE
3. Rebuild the project: `pnpm build`

### Jest tests failing

Update `jest.config.js` to map path aliases:

```javascript
module.exports = {
  moduleNameMapper: {
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};
```

---

## Summary

- ✅ All packages use absolute imports via tsconfig path aliases
- ✅ API routes are centralized in `constants.ts`
- ✅ Relative imports (`../`) only allowed within same folder
- ✅ Consistent pattern across the entire monorepo

