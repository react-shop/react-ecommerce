# Backend Overview

The backend is built with NestJS, Prisma ORM, and GraphQL, providing a robust and type-safe API for the ecommerce platform.

## Architecture

```
apps/server/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── prisma/                # Prisma service
│   ├── auth/                  # Authentication module
│   ├── user/                  # User management
│   ├── product/               # Product management
│   ├── category/              # Category management
│   ├── cart/                  # Shopping cart
│   ├── order/                 # Order processing
│   ├── review/                # Product reviews
│   ├── graphql/
│   │   └── schemas/
│   │       └── schema.gql     # GraphQL schema
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry
└── .env                       # Environment variables
```

## Technology Stack

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **GraphQL** - API query language (Apollo Server)
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

## Key Features

### 1. Modular Architecture

Each feature is organized as a NestJS module with its own:
- **Service** - Business logic
- **Resolver** - GraphQL resolvers
- **DTOs** - Data transfer objects
- **Entities** - Type definitions (from Prisma)

Example module structure:

```typescript
// cart/cart.module.ts
@Module({
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}

// cart/cart.service.ts
@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}
  
  async getCart(userId: string) {
    // Business logic
  }
}

// cart/cart.resolver.ts
@Resolver('Cart')
export class CartResolver {
  constructor(private cartService: CartService) {}
  
  @Query('cart')
  @UseGuards(JwtAuthGuard)
  async getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.id);
  }
}
```

### 2. Prisma Integration

Prisma provides type-safe database access:

```typescript
// Get products with relations
const products = await this.prisma.product.findMany({
  where: { status: 'ACTIVE' },
  include: {
    category: true,
    variants: true,
    reviews: {
      where: { status: 'APPROVED' },
      include: { user: true },
    },
  },
  orderBy: { createdAt: 'desc' },
});
```

### 3. GraphQL API

The API is defined using GraphQL schema-first approach:

```graphql
type Product {
  id: ID!
  name: String!
  slug: String!
  price: Float!
  category: Category
  variants: [ProductVariant!]
}

type Query {
  products(skip: Int, take: Int): [Product!]!
  product(id: ID, slug: String): Product
}
```

### 4. Authentication & Authorization

**JWT Authentication:**

```typescript
// Protect routes with guards
@Query('cart')
@UseGuards(JwtAuthGuard)
async getCart(@CurrentUser() user: any) {
  return this.cartService.getCart(user.id);
}
```

**Role-Based Access:**

```typescript
// Admin-only routes
@Query('adminOrders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
async getAdminOrders() {
  return this.orderService.getAllOrders();
}
```

**OAuth Support:**

```typescript
// OAuth strategies configured
- Google OAuth 2.0
- GitHub OAuth
```

### 5. Error Handling

Centralized error handling:

```typescript
// Custom exceptions
throw new NotFoundException('Product not found');
throw new BadRequestException('Invalid quantity');
throw new UnauthorizedException('Invalid credentials');

// Global exception filter
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Handle and format errors
  }
}
```

## API Modules

### Auth Module
- User registration
- Login with email/password
- OAuth (Google, GitHub)
- Password reset via email
- Token refresh

### Product Module
- CRUD operations
- Product variants
- Search and filtering
- Image management
- SEO metadata

### Category Module
- Hierarchical categories
- Category tree management
- Product associations

### Cart Module
- Add/remove items
- Update quantities
- Persistent cart (database)
- Variant support

### Order Module
- Create orders from cart
- Order status management
- Order tracking
- Order history

### Review Module
- Create/edit reviews
- Rating system (1-5 stars)
- Review moderation
- Approved reviews display

### User Module
- User profile management
- Address management
- Wishlist
- Order history

## Database Schema

The complete schema is defined in `prisma/schema.prisma`. Key models:

- **User** - User accounts with OAuth support
- **Product** - Products with variants
- **ProductVariant** - SKUs with attributes
- **Category** - Hierarchical categories
- **Cart** - User shopping carts
- **Order** - Purchase orders
- **Review** - Product reviews
- **Wishlist** - Saved products

See [Database Schema](./database_schema.md) for details.

## API Endpoints

### GraphQL Endpoint

```
POST http://localhost:3001/graphql
```

### GraphQL Playground

```
GET http://localhost:3001/graphql
```

Interactive playground for testing queries and mutations.

## Performance Optimizations

### 1. Database Indexing

```prisma
model Product {
  id   String @id @default(uuid())
  slug String @unique
  
  @@index([slug])
  @@index([categoryId])
  @@index([status])
}
```

### 2. Query Optimization

```typescript
// Use select to fetch only needed fields
const products = await this.prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
    images: true,
  },
});

// Use cursor-based pagination
const products = await this.prisma.product.findMany({
  take: 10,
  skip: 1,
  cursor: { id: lastProductId },
});
```

### 3. Caching (Optional)

Redis caching can be added for:
- Product lists
- Category tree
- User sessions

### 4. Connection Pooling

Prisma automatically manages connection pooling.

## Security Best Practices

### 1. Password Security

```typescript
import * as bcrypt from 'bcrypt';

// Hash passwords
const hashedPassword = await bcrypt.hash(password, 10);

// Verify passwords
const isValid = await bcrypt.compare(password, hashedPassword);
```

### 2. JWT Security

- Short-lived access tokens (7 days)
- Refresh tokens for renewal (30 days)
- Tokens stored securely on client

### 3. Input Validation

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

### 4. Rate Limiting

Add rate limiting middleware:

```typescript
import * as rateLimit from 'express-rate-limit';

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
```

## Testing

### Unit Tests

```typescript
describe('ProductService', () => {
  it('should create a product', async () => {
    const product = await service.create({
      name: 'Test Product',
      price: 99.99,
    });
    expect(product.name).toBe('Test Product');
  });
});
```

### E2E Tests

```typescript
describe('Products (e2e)', () => {
  it('/graphql (POST) - get products', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: '{ products { id name } }',
      })
      .expect(200);
  });
});
```

## Deployment

See [Deployment Guide](./deployment.md) for production setup.

## Next Steps

- [Database Schema](./database_schema.md) - Understand the data model
- [GraphQL API](./graphql_api.md) - API reference
- [Authentication](./authentication.md) - Auth implementation details

