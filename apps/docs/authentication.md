# Authentication

Complete authentication system with JWT and OAuth support.

## Overview

The authentication system supports:
- Email/password registration and login
- OAuth (Google, GitHub)
- Password reset via email
- JWT access and refresh tokens
- Role-based authorization

## Authentication Flow

```
Client                    Server                  Database
  |                         |                         |
  | 1. POST /login          |                         |
  |------------------------>|                         |
  |                         | 2. Verify credentials   |
  |                         |------------------------>|
  |                         |<------------------------|
  |                         | 3. Generate JWT tokens  |
  | 4. Return tokens        |                         |
  |<------------------------|                         |
  | 5. Store tokens         |                         |
  |                         |                         |
  | 6. Request with token   |                         |
  |------------------------>|                         |
  |                         | 7. Verify token         |
  |                         | 8. Execute request      |
  |                         |------------------------>|
  | 9. Return response      |                         |
  |<------------------------|                         |
```

## Backend Implementation

### JWT Strategy

```typescript
// apps/server/src/auth/jwt.strategy.ts
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    
    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, email: user.email, role: user.role };
  }
}
```

### Auth Service

```typescript
// apps/server/src/auth/auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string, firstName?: string, lastName?: string) {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user, ...tokens };
  }

  async login(email: string, password: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return { user, ...tokens };
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION || '7d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
    });

    return { accessToken, refreshToken };
  }
}
```

### Auth Guard

```typescript
// apps/server/src/auth/auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
```

### Protected Routes

```typescript
// Use guard on resolver
@Query('cart')
@UseGuards(JwtAuthGuard)
async getCart(@CurrentUser() user: any) {
  return this.cartService.getCart(user.id);
}
```

### User Decorator

```typescript
// apps/server/src/user/user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
```

## Frontend Implementation

### Login

```typescript
import { useLogin, updateClientToken } from '@react-shop/services';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      // Update GraphQL client token
      updateClientToken(data.login.accessToken);
      
      // Store refresh token in localStorage
      localStorage.setItem('refreshToken', data.login.refreshToken);
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(data.login.user));
      
      // Redirect
      router.push('/');
    },
    onError: (error) => {
      toast.error('Login failed: ' + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
}
```

### Register

```typescript
import { useRegister, updateClientToken } from '@react-shop/services';

function RegisterForm() {
  const { mutate: register, isPending } = useRegister({
    onSuccess: (data) => {
      updateClientToken(data.register.accessToken);
      localStorage.setItem('refreshToken', data.register.refreshToken);
      router.push('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      input: {
        email,
        password,
        firstName,
        lastName,
      },
    });
  };

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### Logout

```typescript
import { useLogout, updateClientToken } from '@react-shop/services';

function LogoutButton() {
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      // Clear tokens
      updateClientToken(null);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Redirect to login
      router.push('/login');
    },
  });

  return <Button onClick={() => logout()}>Logout</Button>;
}
```

### Protected Routes

```typescript
// middleware.ts (Next.js App Router)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*'],
};
```

### Auth Context

```typescript
// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useMe } from '@react-shop/services';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useMe({
    retry: false,
    enabled: !!localStorage.getItem('refreshToken'),
  });

  const value = {
    user: data?.me || null,
    isLoading,
    isAuthenticated: !!data?.me,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## OAuth Implementation

### Google OAuth

Backend setup:

```typescript
// apps/server/src/auth/google.strategy.ts
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, emails, name } = profile;
    
    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { googleId: id },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: id,
          email: emails[0].value,
          firstName: name.givenName,
          lastName: name.familyName,
        },
      });
    }

    return user;
  }
}
```

Frontend:

```typescript
function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return <Button onClick={handleGoogleLogin}>Login with Google</Button>;
}
```

## Password Reset

### Request Reset

```typescript
import { useRequestPasswordReset } from '@react-shop/services';

function ForgotPasswordForm() {
  const { mutate: requestReset, isPending } = useRequestPasswordReset({
    onSuccess: () => {
      toast.success('Password reset email sent!');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestReset({ email });
  };

  return <form onSubmit={handleSubmit}>{/* Form */}</form>;
}
```

### Reset Password

```typescript
import { useResetPassword } from '@react-shop/services';

function ResetPasswordForm({ token }: { token: string }) {
  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => {
      toast.success('Password reset successful!');
      router.push('/login');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetPassword({ token, newPassword });
  };

  return <form onSubmit={handleSubmit}>{/* Form */}</form>;
}
```

## Role-Based Authorization

### Backend

```typescript
// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    return requiredRoles.some((role) => user.role === role);
  }
}

// Usage
@Query('adminOrders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
async getAdminOrders() {
  return this.orderService.getAllOrders();
}
```

### Frontend

```typescript
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  if (!user || user.role === 'CUSTOMER') {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
```

## Security Best Practices

1. **Secure Token Storage** - Use httpOnly cookies for tokens
2. **Short Token Expiration** - Keep access tokens short-lived
3. **Refresh Token Rotation** - Rotate refresh tokens on use
4. **Password Hashing** - Use bcrypt with high cost factor
5. **Rate Limiting** - Limit login attempts
6. **HTTPS Only** - Always use HTTPS in production
7. **CSRF Protection** - Implement CSRF tokens
8. **Input Validation** - Validate all user inputs

## Next Steps

- [User Management](./users.md) - User profiles and roles
- [Backend Overview](./backend.md) - API implementation

