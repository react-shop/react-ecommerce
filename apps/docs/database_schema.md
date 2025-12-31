# Database Schema

Complete reference for the Prisma database schema.

## Overview

The database uses PostgreSQL with Prisma ORM. All models are defined in `apps/server/prisma/schema.prisma`.

## Entity Relationship Diagram

```
User
  ├── addresses (1:N)
  ├── cart (1:1)
  ├── orders (1:N)
  ├── reviews (1:N)
  └── wishlist (1:1)

Product
  ├── category (N:1)
  ├── variants (1:N)
  ├── cartItems (1:N)
  ├── orderItems (1:N)
  ├── reviews (1:N)
  └── wishlists (N:M)

Order
  ├── user (N:1)
  ├── items (1:N)
  ├── shippingAddress (N:1)
  └── billingAddress (N:1)
```

## Models

### User

User accounts with authentication and profile data.

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String?  // Nullable for OAuth users
  firstName String?
  lastName  String?
  phone     String?
  role      UserRole @default(CUSTOMER)
  
  // OAuth
  googleId  String?  @unique
  githubId  String?  @unique
  
  // Password reset
  resetPasswordToken   String?
  resetPasswordExpires DateTime?
  
  // Relations
  addresses  Address[]
  cart       Cart?
  orders     Order[]
  reviews    Review[]
  wishlist   Wishlist?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Enums:**
- `UserRole`: CUSTOMER, ADMIN, SUPER_ADMIN

**Indexes:**
- `email`, `googleId`, `githubId`

### Address

Shipping and billing addresses.

```prisma
model Address {
  id        String  @id @default(uuid())
  street    String
  city      String
  state     String
  zip       String
  country   String
  isDefault Boolean @default(false)
  
  user   User   @relation(fields: [userId], references: [id])
  userId String
  
  shippingOrders Order[] @relation("ShippingAddress")
  billingOrders  Order[] @relation("BillingAddress")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product

Products with pricing and metadata.

```prisma
model Product {
  id          String        @id @default(uuid())
  name        String
  slug        String        @unique
  description String?
  price       Float
  images      String[]
  status      ProductStatus @default(DRAFT)
  
  // SEO
  metaTitle       String?
  metaDescription String?
  metaKeywords    String[]
  
  // Relations
  category   Category? @relation(fields: [categoryId], references: [id])
  categoryId String?
  
  variants   ProductVariant[]
  cartItems  CartItem[]
  orderItems OrderItem[]
  reviews    Review[]
  wishlists  Wishlist[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Enums:**
- `ProductStatus`: DRAFT, ACTIVE, ARCHIVED

**Indexes:**
- `slug`, `categoryId`, `status`

### ProductVariant

Product variations (size, color, etc.) with individual pricing and stock.

```prisma
model ProductVariant {
  id      String @id @default(uuid())
  sku     String @unique
  price   Float
  stock   Int    @default(0)
  
  // JSON attributes: {color: "red", size: "M"}
  attributes Json
  
  product      Product     @relation(fields: [productId], references: [id])
  productId    String
  cartItems    CartItem[]
  orderItems   OrderItem[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Category

Hierarchical product categories.

```prisma
model Category {
  id          String  @id @default(uuid())
  name        String
  slug        String  @unique
  description String?
  image       String?
  
  // Self-referencing for hierarchy
  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  parentId String?
  children Category[] @relation("CategoryHierarchy")
  
  products Product[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Cart

User shopping cart (persisted in database).

```prisma
model Cart {
  id     String     @id @default(uuid())
  items  CartItem[]
  
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### CartItem

Items in a shopping cart.

```prisma
model CartItem {
  id       String @id @default(uuid())
  quantity Int    @default(1)
  
  cart   Cart   @relation(fields: [cartId], references: [id])
  cartId String
  
  product   Product @relation(fields: [productId], references: [id])
  productId String
  
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  variantId String?
  
  @@unique([cartId, productId, variantId])
}
```

### Order

Purchase orders.

```prisma
model Order {
  id     String      @id @default(uuid())
  status OrderStatus @default(PENDING)
  
  // Pricing
  subtotal     Float
  shippingCost Float   @default(0)
  tax          Float   @default(0)
  total        Float
  
  // Payment
  paymentMethod String?
  paymentId     String?
  paidAt        DateTime?
  
  // Shipping
  shippingAddress   Address @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  shippingAddressId String
  
  billingAddress   Address @relation("BillingAddress", fields: [billingAddressId], references: [id])
  billingAddressId String
  
  trackingNumber String?
  shippedAt      DateTime?
  deliveredAt    DateTime?
  
  // Relations
  user   User   @relation(fields: [userId], references: [id])
  userId String
  
  items OrderItem[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Enums:**
- `OrderStatus`: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED

**Indexes:**
- `userId`, `status`

### OrderItem

Items in an order (snapshot of product/variant at purchase time).

```prisma
model OrderItem {
  id       String @id @default(uuid())
  quantity Int
  price    Float  // Price at time of order
  
  order   Order  @relation(fields: [orderId], references: [id])
  orderId String
  
  product   Product @relation(fields: [productId], references: [id])
  productId String
  
  variant   ProductVariant? @relation(fields: [variantId], references: [id])
  variantId String?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Review

Product reviews and ratings.

```prisma
model Review {
  id      String       @id @default(uuid())
  rating  Int          // 1-5
  comment String?
  status  ReviewStatus @default(PENDING)
  
  user   User   @relation(fields: [userId], references: [id])
  userId String
  
  product   Product @relation(fields: [productId], references: [id])
  productId String
  
  @@unique([userId, productId]) // One review per user per product
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Enums:**
- `ReviewStatus`: PENDING, APPROVED, REJECTED

**Indexes:**
- `productId`, `status`

### Wishlist

User wishlist (many-to-many with products).

```prisma
model Wishlist {
  id       String    @id @default(uuid())
  products Product[]
  
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### StoreSetting

Key-value store for application settings.

```prisma
model StoreSetting {
  id    String @id @default(uuid())
  key   String @unique
  value Json
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Migrations

### Create Migration

```bash
cd apps/server
pnpm prisma migrate dev --name migration_name
```

### Apply Migrations

```bash
pnpm prisma migrate deploy
```

### Reset Database

```bash
pnpm prisma migrate reset
```

**Warning:** This deletes all data!

## Seeding

Create a seed file:

```typescript
// apps/server/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Electronic devices',
    },
  });

  // Create products
  await prisma.product.create({
    data: {
      name: 'Laptop',
      slug: 'laptop',
      price: 999.99,
      images: ['/laptop.jpg'],
      status: 'ACTIVE',
      categoryId: electronics.id,
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

Add to package.json:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Run seed:

```bash
pnpm prisma db seed
```

## Prisma Studio

Visual database editor:

```bash
cd apps/server
pnpm prisma studio
```

Opens at http://localhost:5555

## Best Practices

### 1. Use Transactions

```typescript
await prisma.$transaction(async (tx) => {
  const order = await tx.order.create({ data: orderData });
  await tx.cartItem.deleteMany({ where: { cartId } });
});
```

### 2. Optimize Queries

```typescript
// Use include for relations
const product = await prisma.product.findUnique({
  where: { id },
  include: {
    category: true,
    variants: true,
  },
});

// Use select for specific fields
const products = await prisma.product.findMany({
  select: {
    id: true,
    name: true,
    price: true,
  },
});
```

### 3. Handle Errors

```typescript
try {
  await prisma.user.create({ data: userData });
} catch (error) {
  if (error.code === 'P2002') {
    throw new Error('Email already exists');
  }
  throw error;
}
```

### 4. Use Indexes

Add indexes for frequently queried fields in schema.prisma:

```prisma
@@index([email])
@@index([slug])
@@index([status])
```

## Next Steps

- [Backend Overview](./backend.md) - API implementation
- [GraphQL API](./graphql_api.md) - Query and mutation reference

