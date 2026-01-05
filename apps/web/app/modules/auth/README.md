# Auth Module

This module contains all authentication-related logic for the web application.

## Structure

```
/app/modules/auth/
├── components/           # Reusable form components
│   ├── FormField.tsx    # Generic form field with validation
│   ├── LoginForm.tsx    # Login form component
│   ├── RegisterForm.tsx # Registration form component
│   ├── ForgotPasswordForm.tsx # Forgot password form
│   └── index.ts         # Barrel export
├── screens/             # Container components with business logic
│   ├── LoginScreen.tsx  # Login screen container
│   ├── RegisterScreen.tsx # Register screen container
│   ├── ForgotPasswordScreen.tsx # Forgot password screen
│   └── index.ts         # Barrel export
└── README.md            # This file
```

## Architecture Pattern

### Pages (Minimal)
- Located in `/app/(auth)/*/page.tsx`
- Only imports and renders the screen component
- No business logic

### Screens (Containers)
- Located in `/app/modules/auth/screens/`
- Contains business logic (API calls, routing, state management)
- Handles success/error states
- Uses SDK hooks (useLogin, useRegister, etc.)
- Renders forms and layout components

### Components (Presentational)
- Located in `/app/modules/auth/components/`
- Pure presentational components
- Receives data and callbacks via props
- No direct API calls or routing
- Reusable across different screens

## Usage Example

### Page (Minimal)
```tsx
// app/(auth)/login/page.tsx
import { LoginScreen } from "@/app/modules/auth/screens";

export default function LoginPage() {
  return <LoginScreen />;
}
```

### Screen (Container)
```tsx
// app/modules/auth/screens/LoginScreen.tsx
"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "@react-shop/sdk";
import { LoginForm } from "../components";

export function LoginScreen() {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();

  const handleSubmit = (data) => {
    login(data, {
      onSuccess: () => router.push("/"),
    });
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isPending} />;
}
```

### Component (Presentational)
```tsx
// app/modules/auth/components/LoginForm.tsx
"use client";

import { useForm, FormProvider } from "react-hook-form";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const methods = useForm();
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </FormProvider>
  );
}
```

## Benefits

1. **Separation of Concerns**: Pages, screens, and components have clear responsibilities
2. **Reusability**: Components can be reused across different screens
3. **Testability**: Each layer can be tested independently
4. **Maintainability**: Changes are isolated to specific layers
5. **Scalability**: Easy to add new features following the same pattern

## Adding New Auth Features

1. Create form component in `/components/` if needed
2. Create screen container in `/screens/`
3. Create page in `/app/(auth)/*/page.tsx`
4. Export components from index files

Example:
```bash
# 1. Create form component
/app/modules/auth/components/ResetPasswordForm.tsx

# 2. Create screen container
/app/modules/auth/screens/ResetPasswordScreen.tsx

# 3. Create page
/app/(auth)/reset-password/page.tsx
```

