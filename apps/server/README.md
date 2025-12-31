# Backend API Server

NestJS GraphQL API server for the React Ecommerce boilerplate.

## Overview

This is a NestJS application that provides a GraphQL API for the ecommerce platform. It uses:

- **NestJS** - Progressive Node.js framework
- **GraphQL** - API query language with Apollo Server
- **Prisma** - Next-generation ORM for database management
- **PostgreSQL** - Relational database
- **JWT** - Authentication with Passport.js
- **Docker** - Containerized database setup

## Architecture

```
src/
├── auth/           → Authentication (JWT, OAuth)
├── user/           → User management
├── product/        → Product catalog
├── category/       → Product categories
├── attribute/      → Product attributes
├── cart/           → Shopping cart
├── order/          → Order management
├── review/         → Product reviews
├── store/          → Store management
├── prisma/         → Prisma service
├── graphql/        → GraphQL schema definitions
└── shared/         → Shared utilities and pipes
```

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Docker** and **Docker Compose** (for database)

## Getting Started

### 1. Environment Setup

Create a `.env` file in the `apps/server` directory:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Application
PORT=3000
NODE_ENV=development
```

### 2. Start PostgreSQL Database

Start the PostgreSQL database and pgAdmin using Docker Compose:

```bash
cd apps/server
docker-compose up -d
```

This will start:
- **PostgreSQL** on port 5432
- **pgAdmin** on port 5050 (http://localhost:5050)
  - Email: `admin@admin.com`
  - Password: `root`

To stop the database:

```bash
docker-compose down
```

To stop and remove all data:

```bash
docker-compose down -v
```

### 3. Install Dependencies

From the root of the monorepo:

```bash
pnpm install
```

Or from the server directory:

```bash
cd apps/server
pnpm install
```

### 4. Setup Prisma and Database

Generate Prisma client:

```bash
cd apps/server
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

This will:
1. Create the database schema
2. Generate the Prisma client
3. Apply all migrations

Seed the database with sample data:

```bash
npx prisma db seed
# or
pnpm prisma:seed
```

This will create:
- Admin user: `admin@ecommerce.com` / `admin123`
- Customer user: `customer@example.com` / `customer123`
- Sample categories, products, reviews, and more

**Note:** Seeding uses `upsert` so it's safe to run multiple times.

### 5. Run the Application

#### Development Mode (with hot reload)

From the root:

```bash
pnpm dev
```

Or from the server directory:

```bash
cd apps/server
pnpm dev
```

The server will start on http://localhost:3000

#### Production Mode

```bash
# Build
pnpm build

# Start
pnpm start:prod
```

## Available Scripts

```bash
# Development
pnpm dev              # Start in watch mode
pnpm start            # Start without watch mode
pnpm start:debug      # Start in debug mode

# Build
pnpm build            # Build for production

# Testing
pnpm test             # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm test:cov         # Run tests with coverage
pnpm test:e2e         # Run end-to-end tests

# Linting
pnpm lint             # Run ESLint and fix issues
pnpm format           # Format code with Prettier

# Prisma
pnpm prisma:studio    # Open Prisma Studio (database GUI)
pnpm prisma:migrate   # Create new migration
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:push      # Push schema changes without migration
pnpm prisma:pull      # Pull schema from database
pnpm prisma:reset     # Reset database
pnpm prisma:seed      # Seed database with sample data
```

## GraphQL Playground

Once the server is running, you can access the GraphQL Playground at:

**http://localhost:3000/graphql**

The playground provides:
- Interactive API documentation
- Query/mutation testing
- Schema exploration

### Example Queries

**Register a new user:**

```graphql
mutation {
  register(input: {
    email: "user@example.com"
    password: "securepassword"
    firstName: "John"
    lastName: "Doe"
  }) {
    accessToken
    user {
      id
      email
      firstName
      lastName
    }
  }
}
```

**Login:**

```graphql
mutation {
  login(input: {
    email: "user@example.com"
    password: "securepassword"
  }) {
    accessToken
    user {
      id
      email
    }
  }
}
```

**Get products:**

```graphql
query {
  products(limit: 10, offset: 0) {
    id
    name
    description
    price
    images
    category {
      id
      name
    }
  }
}
```

## Database Management

### Prisma Studio

Access the database with a GUI:

```bash
npx prisma studio
```

Opens on http://localhost:5555

### Creating Migrations

When you modify the Prisma schema:

```bash
npx prisma migrate dev --name describe_your_changes
```

### Reset Database

⚠️ **Warning:** This will delete all data!

```bash
npx prisma migrate reset
```

## Authentication

The API uses JWT-based authentication. Protected routes require an `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

In GraphQL Playground, add the token in HTTP Headers:

```json
{
  "Authorization": "Bearer your-jwt-token-here"
}
```

### Test Credentials (After Seeding)

If you've run the seed script, use these credentials for testing:

**Admin Account:**
- Email: `admin@ecommerce.com`
- Password: `admin123`
- Role: ADMIN

**Customer Account:**
- Email: `customer@example.com`
- Password: `customer123`
- Role: CUSTOMER

## TODO

Future improvements planned:

- [ ] Add table for categories (with subcategories support)
- [ ] Add table for tags
- [ ] Create pipe to validate if the seller is an employee of the correct store
- [ ] Create pipe to validate if user has the correct role for operations
- [ ] Add data seeding scripts
- [ ] Add more comprehensive tests
- [ ] Implement rate limiting
- [ ] Add API documentation generation
- [ ] Implement caching with Redis

## Troubleshooting

### Port already in use

If port 3000 or 5432 is already in use:

```bash
# Find process using the port
lsof -i :3000
lsof -i :5432

# Kill the process
kill -9 <PID>
```

Or change the port in `.env`:

```
PORT=3001
DATABASE_PORT=5433
```

### Prisma client not generated

```bash
npx prisma generate
```

### Database connection failed

1. Ensure Docker containers are running: `docker ps`
2. Check `.env` configuration matches `docker-compose.yml`
3. Verify PostgreSQL is accessible: `docker logs pg_database`

### Migration failed

```bash
# Reset and reapply all migrations
npx prisma migrate reset

# Or force push schema
npx prisma db push --force-reset
```

## Project Structure

```
apps/server/
├── prisma/
│   └── schema.prisma          → Database schema
├── src/
│   ├── auth/                  → Authentication module
│   ├── user/                  → User management
│   ├── product/               → Product catalog
│   ├── cart/                  → Shopping cart
│   ├── order/                 → Order processing
│   ├── review/                → Product reviews
│   ├── category/              → Categories
│   ├── attribute/             → Product attributes
│   ├── store/                 → Store management
│   ├── prisma/                → Prisma service
│   ├── graphql/               → GraphQL schemas
│   │   └── schemas/
│   │       └── schema.gql     → GraphQL type definitions
│   ├── shared/                → Shared utilities
│   ├── app.module.ts          → Root module
│   └── main.ts                → Application entry point
├── test/                      → E2E tests
├── docker-compose.yml         → Docker setup
├── nest-cli.json              → NestJS CLI config
├── tsconfig.json              → TypeScript config
└── package.json               → Dependencies and scripts
```

## Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [GraphQL Documentation](https://graphql.org/learn)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## License

This project is part of the React Ecommerce Boilerplate and is MIT licensed.
