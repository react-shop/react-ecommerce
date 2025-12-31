# Seed File Update Required

## Status: ⚠️ Needs Update

The current `prisma/seed.ts` file is **outdated** and needs to be rewritten to match the new comprehensive schema.

## What Changed

### New Tables to Seed:
1. ✅ `users` - Updated with new fields
2. ✅ `addresses` - New structure  
3. ✅ `products` - Restructured
4. 🆕 `product_images` - NEW (was array in products)
5. ✅ `product_variants` - Updated
6. ✅ `categories` - Updated
7. 🆕 `product_categories` - NEW (many-to-many)
8. 🆕 `tags` - NEW
9. 🆕 `product_tags` - NEW
10. ✅ `carts` - Updated
11. ✅ `cart_items` - Updated
12. ✅ `orders` - Significantly changed
13. ✅ `order_items` - Updated
14. 🆕 `payments` - NEW (was in orders)
15. 🆕 `shipments` - NEW (was in orders)
16. 🆕 `discounts` - NEW
17. 🆕 `discount_products` - NEW
18. ✅ `reviews` - Updated with new fields
19. ✅ `wishlists` - Updated
20. ✅ `store_settings` - Updated

## Key Changes to Address

### 1. Users
- Added: `avatar`, `isActive`, `emailVerified`, `emailVerifiedAt`, `emailVerifyToken`
- Kept: Basic auth fields, OAuth fields

### 2. Addresses
- Added: `firstName`, `lastName`, `company`
- Changed: `zip` → `zipCode`

### 3. Products
- Removed: `images` array (now in `product_images` table)
- Added: `shortDesc`, `comparePrice`, `costPrice`, `barcode`
- Added: `trackInventory`, `stock`, `lowStockAlert`
- Added: `weight`, `length`, `width`, `height`
- Changed: Categories now many-to-many

### 4. Product Images (NEW)
```typescript
{
  url: string
  alt?: string
  sortOrder: number
  isPrimary: boolean
  product: Product
}
```

### 5. Product Categories (NEW)
```typescript
{
  product: Product
  category: Category
  isPrimary: boolean  // Mark main category
}
```

### 6. Tags & Product Tags (NEW)
```typescript
// Tag
{
  name: string
  slug: string
}

// ProductTag (junction)
{
  product: Product
  tag: Tag
}
```

### 7. Orders
- Changed: `discount` field → `discountAmount` (renamed)
- Moved: Payment info → `payments` table
- Moved: Shipping info → `shipments` table
- Added: `orderNumber`, `customerNote`, `adminNote`

### 8. Payments (NEW)
```typescript
{
  amount: Float
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  transactionId?: string
  gatewayResponse?: Json
  cardLast4?: string
  cardBrand?: string
  refundedAmount?: Float
  order: Order
  user: User
}
```

### 9. Shipments (NEW)
```typescript
{
  trackingNumber?: string
  carrier?: string
  service?: string
  status: ShipmentStatus
  weight, length, width, height?: Float
  shippingCost?: Float
  order: Order
  address: Address
}
```

### 10. Discounts (NEW)
```typescript
{
  code: string
  type: DiscountType
  value: Float
  maxUses?: Int
  usedCount: Int
  minPurchase?: Float
  startsAt, expiresAt?: DateTime
  isActive: boolean
}
```

### 11. Reviews
- Added: `title`, `helpfulCount`, `adminResponse`, `respondedAt`

## Sample Seed Structure

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Users
  const admin = await prisma.user.create({...});
  const customer = await prisma.user.create({...});
  
  // 2. Create Addresses
  const address = await prisma.address.create({...});
  
  // 3. Create Tags
  const tags = await prisma.tag.createMany({...});
  
  // 4. Create Categories
  const categories = await prisma.category.createMany({...});
  
  // 5. Create Products (without images first)
  const product = await prisma.product.create({...});
  
  // 6. Create Product Images
  await prisma.productImage.createMany({...});
  
  // 7. Link Product to Categories
  await prisma.productCategory.create({
    data: {
      productId: product.id,
      categoryId: categories[0].id,
      isPrimary: true
    }
  });
  
  // 8. Link Product to Tags
  await prisma.productTag.createMany({...});
  
  // 9. Create Product Variants
  await prisma.productVariant.createMany({...});
  
  // 10. Create Discount
  const discount = await prisma.discount.create({...});
  
  // 11. Create Cart & Cart Items
  const cart = await prisma.cart.create({...});
  await prisma.cartItem.create({...});
  
  // 12. Create Order
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      orderNumber: 'ORD-2024-001',
      status: 'PENDING',
      subtotal: 100,
      discountAmount: 10,
      tax: 8,
      shippingCost: 5,
      total: 103,
      shippingAddressId: address.id,
      billingAddressId: address.id,
      discountId: discount.id,
    }
  });
  
  // 13. Create Order Items
  await prisma.orderItem.create({...});
  
  // 14. Create Payment
  await prisma.payment.create({
    data: {
      orderId: order.id,
      userId: customer.id,
      amount: 103,
      currency: 'USD',
      status: 'COMPLETED',
      method: 'CREDIT_CARD',
      paidAt: new Date(),
    }
  });
  
  // 15. Create Shipment
  await prisma.shipment.create({
    data: {
      orderId: order.id,
      addressId: address.id,
      trackingNumber: 'TRACK123',
      carrier: 'FedEx',
      status: 'PENDING',
    }
  });
  
  // 16. Create Reviews
  await prisma.review.create({...});
  
  // 17. Create Wishlist
  await prisma.wishlist.create({...});
  
  // 18. Create Store Settings
  await prisma.storeSetting.createMany({...});
}
```

## Next Steps

1. ⚠️ **The current seed file will NOT work** - it references old schema
2. 📝 Rewrite `prisma/seed.ts` following the structure above
3. ✅ Test seeding: `pnpm prisma:seed`
4. 🎯 Add more realistic sample data
5. 📊 Consider adding: Multiple products, orders, reviews, etc.

## Running the Seed

Once updated, run:
```bash
cd apps/server
pnpm prisma:seed
```

Or with reset:
```bash
pnpm prisma migrate reset  # This will ask for consent
```

