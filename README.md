# React Ecommerce Boilerplate

A comprehensive, production-ready ecommerce boilerplate built with React, Next.js, NestJS, Prisma, and GraphQL. Designed as a Turborepo monorepo for easy code sharing between web, mobile, and admin applications.

## Features

- 🎨 **Design System** - PandaCSS-based component library with theming
- 🔄 **GraphQL API** - Type-safe API with React Query hooks
- 🛒 **Full Ecommerce** - Products, cart, checkout, orders, reviews
- 🔐 **Authentication** - JWT + OAuth (Google, GitHub)
- 📱 **Mobile Ready** - Architecture supports React Native
- 🎯 **Admin Dashboard** - Product, order, and user management
- 🚀 **Modern Stack** - Next.js 14, NestJS, Prisma, TypeScript

## Quick Start

### Prerequisites

- Node.js 18+
- Yarn 1.x
- PostgreSQL 14+

### Installation

```bash
# Clone and install
git clone <repository-url>
cd react-ecommerce
yarn install

# Setup database
cd apps/server
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
yarn prisma migrate dev

# Generate types
yarn prisma generate
cd ../../packages/services
yarn codegen

# Start development
cd ../..
yarn dev
```

The backend API will be available at `http://localhost:3001/graphql`

## Project Structure

```
/apps
  /web          → Customer-facing Next.js app
  /admin        → Admin dashboard Next.js app
  /server       → NestJS GraphQL API

/packages
  /design-system → PandaCSS component library
  /services      → React Query + GraphQL hooks
  /eslint-config-custom → Shared ESLint config
  /tsconfig      → Shared TypeScript config
```

## Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- PandaCSS (Styling)
- React Query (Data fetching)
- GraphQL (API layer)
- TypeScript

**Backend:**
- NestJS (Framework)
- Prisma (ORM)
- PostgreSQL (Database)
- GraphQL (API)
- JWT + OAuth (Auth)

## Documentation

- [Features & Implementation Guide](./FEATURES.md) - Comprehensive feature documentation
- [API Documentation](http://localhost:3001/graphql) - GraphQL Playground (when server is running)
- [Design System](./packages/design-system/README.md) - Component library documentation

## Available Scripts

```bash
# Development
yarn dev          # Start all apps in development mode
yarn dev:server   # Start only the backend
yarn dev:web      # Start only the web app

# Building
yarn build        # Build all apps
yarn lint         # Lint all packages

# Database
yarn prisma:migrate  # Run database migrations
yarn prisma:studio   # Open Prisma Studio
yarn prisma:generate # Generate Prisma Client

# Code Generation
yarn codegen      # Generate GraphQL types
```

## Key Features

### Design System
- Token-based theming (light/dark mode)
- Responsive components
- Ecommerce-specific components (ProductCard, PriceDisplay, Rating)
- Zero-runtime CSS with PandaCSS

### Backend API
- Full CRUD for products, categories, orders, reviews
- Cart management with database persistence
- Order tracking and management
- Review system with moderation
- Role-based access control
- OAuth integration (Google, GitHub)

### Services Package
- Type-safe GraphQL hooks
- Automatic type generation
- React Query integration
- Optimistic updates
- Error handling

## Customization

### Adding Components

```typescript
// packages/design-system/src/components/MyComponent/MyComponent.tsx
import { styled } from '../../../styled-system/jsx';

export const MyComponent = styled('div', {
  base: {
    padding: '4',
    borderRadius: 'md',
  },
});
```

### Adding GraphQL Queries

```graphql
# packages/services/src/graphql/custom.graphql
query GetCustomData {
  customData {
    id
    name
  }
}
```

Then run `yarn codegen` to generate TypeScript types.

### Extending Database

```prisma
// apps/server/prisma/schema.prisma
model NewModel {
  id   String @id @default(uuid())
  name String
}
```

Then run `yarn prisma migrate dev --name add_new_model`.

## React Native Support

The architecture is designed for React Native integration:

1. Create a mobile app
2. Install `@react-shop/services`
3. Use the same GraphQL hooks
4. Adapt UI components to React Native

## Deployment

### Docker

```bash
docker-compose up -d
```

### Environment Variables

Required for production:
- `DATABASE_URL`
- `JWT_SECRET` & `JWT_REFRESH_SECRET`
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`
- SMTP configuration for emails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PandaCSS Documentation](https://panda-css.com)
