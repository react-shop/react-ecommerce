# Getting Started

This guide will help you set up and run the React Ecommerce Boilerplate on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Yarn 1.x** - Install: `npm install -g yarn`
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

Optional:
- **Docker** - For containerized development
- **Redis** - For caching (optional)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-ecommerce
```

### 2. Install Dependencies

```bash
yarn install
```

This will install all dependencies for all packages in the monorepo using Turborepo's workspace management.

### 3. Set Up Environment Variables

```bash
cd apps/server
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION="7d"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRATION="30d"

# OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email
SMTP_HOST="smtp.mailtrap.io"
SMTP_PORT="2525"
SMTP_USER="your-smtp-user"
SMTP_PASSWORD="your-smtp-password"
EMAIL_FROM="noreply@ecommerce.com"

# App
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

### 4. Set Up the Database

Create a PostgreSQL database:

```bash
# Using psql
createdb ecommerce

# Or using pgAdmin GUI
```

Run Prisma migrations:

```bash
cd apps/server
yarn prisma migrate dev --name init
```

This will:
- Create all database tables
- Generate Prisma Client
- Seed initial data (if seed script exists)

### 5. Generate Prisma Client

```bash
cd apps/server
yarn prisma generate
```

### 6. Generate PandaCSS

```bash
cd ../../packages/design-system
yarn prepare
```

### 7. Start Development

From the root directory:

```bash
yarn dev
```

This starts:
- **Backend API**: http://localhost:3001
- **GraphQL Playground**: http://localhost:3001/graphql

## Verify Installation

### 1. Check Backend API

Visit http://localhost:3001/graphql and try this query:

```graphql
query {
  categories {
    id
    name
    slug
  }
}
```

### 2. Check Database

```bash
cd apps/server
yarn prisma studio
```

This opens Prisma Studio at http://localhost:5555 where you can view and edit your database.

## What's Next?

Now that your development environment is set up:

1. **Explore the API** - Check out the [GraphQL API documentation](./graphql_api.md)
2. **Learn the Design System** - Read about [PandaCSS components](./design_system.md)
3. **Understand Services** - See how to use [React Query hooks](./services_package.md)
4. **Create Products** - Follow the [Product Management guide](./products.md)

## Common Issues

### Port Already in Use

If port 3001 is already in use, change it in `apps/server/.env`:

```env
PORT=3002
```

### Database Connection Failed

Ensure PostgreSQL is running:

```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL service from Services app
```

### Prisma Generate Fails

Clear Prisma cache and regenerate:

```bash
cd apps/server
rm -rf node_modules/.prisma
yarn prisma generate
```

## Development Tips

### Watch Mode

All packages support watch mode for development:

```bash
# Watch design system changes
cd packages/design-system
yarn prepare --watch

# Watch server changes (already in watch mode with yarn dev)
```

### Database Reset

To reset your database and start fresh:

```bash
cd apps/server
yarn prisma migrate reset
```

**Warning**: This will delete all data!

### View Database Logs

Enable query logging in Prisma:

```typescript
// apps/server/src/prisma/prisma.service.ts
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

## Next Steps

- [Project Structure](./project_structure.md) - Understand the monorepo
- [Backend Overview](./backend.md) - Learn about the API
- [Environment Setup](./environment_setup.md) - Detailed configuration guide

