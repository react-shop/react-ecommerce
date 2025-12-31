# Database Schema Improvements

## Overview

This document outlines the improvements made to the ecommerce database schema for better scalability, maintainability, and feature completeness.

## Key Improvements

### 1. **Separated Payment Management**

**Before:** Payment information embedded in Order model

```prisma
model Order {
  paymentMethod String?
  paymentId     String?
  paidAt        DateTime?
}
```

**After:** Dedicated Payment table

```prisma
model Payment {
  id              String
  amount          Float
  status          PaymentStatus
  method          PaymentMethod
  transactionId   String?
  gatewayResponse Json?
  cardLast4       String?
  refundedAmount  Float?
  order           Order
  // ... more fields
}
```

**Benefits:**

- Support multiple payments per order (partial payments, refunds)
- Track payment history
- Store gateway responses for auditing
- Better refund management

---

### 2. **Dedicated Shipment Tracking**

**Before:** Shipping info in Order model

```prisma
model Order {
  trackingNumber String?
  shippedAt      DateTime?
  deliveredAt    DateTime?
}
```

**After:** Separate Shipment table

```prisma
model Shipment {
  id             String
  trackingNumber String?
  carrier        String?
  service        String?
  status         ShipmentStatus
  weight         Float?
  shippingCost   Float?
  order          Order
  address        Address
  // ... more fields
}
```

**Benefits:**

- Multiple shipments per order (split shipments)
- Track carrier and service details
- Calculate actual shipping costs
- Better delivery status tracking

---

### 3. **Many-to-Many Product-Category Relationship**

**Before:** One-to-many (product belongs to one category)

```prisma
model Product {
  category   Category?
  categoryId String?
}
```

**After:** Many-to-many with junction table

```prisma
model ProductCategory {
  product    Product
  category   Category
  isPrimary  Boolean  // Mark main category
}
```

**Benefits:**

- Products can be in multiple categories
- Better organization and navigation
- Supports breadcrumb navigation
- Flexible category management

---

### 4. **Separated Product Images**

**Before:** Images as String array in Product

```prisma
model Product {
  images String[]
}
```

**After:** Dedicated ProductImage table

```prisma
model ProductImage {
  id        String
  url       String
  alt       String?
  sortOrder Int
  isPrimary Boolean
  product   Product
}
```

**Benefits:**

- Control image order
- Add alt text for SEO/accessibility
- Mark primary image
- Better image management

---

### 5. **Enhanced Product Management**

**New Fields Added:**

- `shortDesc` - For product cards
- `comparePrice` - Show discounts
- `costPrice` - Profit calculations
- `barcode` - Inventory management
- `trackInventory` - Toggle stock tracking
- `lowStockAlert` - Alert threshold
- `weight`, `length`, `width`, `height` - Shipping calculations

---

### 6. **Comprehensive Discount System**

**New Feature:** Full coupon/discount management

```prisma
model Discount {
  code           String
  type           DiscountType  // Percentage, Fixed, Free Shipping
  value          Float
  maxUses        Int?
  usedCount      Int
  minPurchase    Float?
  startsAt       DateTime?
  expiresAt      DateTime?
  orders         Order[]
  productDiscounts DiscountProduct[]
}
```

**Features:**

- Usage limits (total and per user)
- Minimum purchase requirements
- Date-based validity
- Product-specific discounts
- Multiple discount types

---

### 7. **Product Tags System**

**New Feature:** Tag products for better organization

```prisma
model Tag {
  name     String
  products ProductTag[]
}

model ProductTag {
  product  Product
  tag      Tag
}
```

**Use Cases:**

- Filter by tags (e.g., "New Arrival", "Best Seller", "Sale")
- Better search and discovery
- Marketing campaigns
- Featured collections

---

### 8. **Enhanced User Management**

**New Fields:**

- `avatar` - Profile picture
- `isActive` - Enable/disable accounts
- `emailVerified` - Email confirmation
- `emailVerifyToken` - Verification token

---

### 9. **Improved Address Management**

**New Fields:**

- `firstName`, `lastName` - Recipient name
- `company` - Business address
- `phone` - Contact number
- More descriptive field names

---

### 10. **Better Order Management**

**New Fields:**

- `orderNumber` - Human-readable ID (e.g., "ORD-2024-001")
- `discount` - Applied discount amount
- `customerNote` - Customer instructions
- `adminNote` - Internal notes

**Enhanced Statuses:**

```prisma
enum OrderStatus {
  PENDING
  PAYMENT_PENDING
  PAID
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}
```

---

### 11. **Enhanced Review System**

**New Fields:**

- `title` - Review headline
- `helpfulCount` - Upvotes
- `adminResponse` - Store response
- `respondedAt` - Response timestamp

---

## Complete Table Structure

### Core Tables

1. ✅ **users** - User accounts and authentication
2. ✅ **addresses** - Shipping and billing addresses

### Product Management

3. ✅ **products** - Product catalog
4. ✅ **product_images** - Product photos
5. ✅ **product_variants** - Size, color variations
6. ✅ **categories** - Product categories (hierarchical)
7. ✅ **product_categories** - Many-to-many relationship
8. ✅ **tags** - Product tags
9. ✅ **product_tags** - Product-tag relationship

### Shopping & Orders

10. ✅ **carts** - Shopping carts
11. ✅ **cart_items** - Cart contents
12. ✅ **orders** - Customer orders
13. ✅ **order_items** - Order line items

### Payments & Shipping

14. ✅ **payments** - Payment transactions
15. ✅ **shipments** - Shipping tracking

### Marketing & Engagement

16. ✅ **discounts** - Coupons and promotions
17. ✅ **discount_products** - Product-specific discounts
18. ✅ **reviews** - Product reviews
19. ✅ **wishlists** - Customer wishlists

### Configuration

20. ✅ **store_settings** - Application settings

---

## Migration Path

### Step 1: Backup Current Data

```bash
pg_dump -U postgres ecommerce > backup_$(date +%Y%m%d).sql
```

### Step 2: Replace Schema

```bash
# Backup current schema
mv prisma/schema.prisma prisma/schema-old.prisma

# Use new schema
mv prisma/schema-new.prisma prisma/schema.prisma
```

### Step 3: Create Migration

```bash
pnpm prisma migrate dev --name comprehensive_schema_v2
```

### Step 4: Update Seed File

The seed file will need updates to match the new schema structure.

### Step 5: Update Resolvers

GraphQL resolvers will need updates for:

- Payment operations
- Shipment tracking
- Discount management
- Product-category relationships

---

## Breaking Changes

⚠️ **Warning:** This is a major schema change that will affect:

1. **Frontend Code** - Update GraphQL queries/mutations
2. **Backend Resolvers** - Update all resolvers
3. **Seed Data** - Rewrite seed file
4. **Existing Data** - Migration scripts needed

---

## Benefits Summary

✅ **Scalability** - Better structure for growth
✅ **Flexibility** - More configuration options
✅ **Features** - More ecommerce capabilities
✅ **Maintenance** - Easier to manage
✅ **Performance** - Better indexed queries
✅ **Analytics** - Better reporting capabilities

---

## Recommendation

This schema is **production-ready** and follows ecommerce best practices. It's worth the migration effort for:

- Medium to large ecommerce stores
- Multi-category marketplaces
- Stores with complex shipping/payment needs
- Platforms requiring detailed analytics

For **simple stores**, the current schema might be sufficient initially, but this provides better long-term scalability.
