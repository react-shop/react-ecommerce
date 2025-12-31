# Backend Integration - Next Steps

## ✅ Completed Tasks

### 1. Database Schema
- ✅ **Comprehensive Prisma schema** with 20 production-ready tables
- ✅ **Database migrations** applied successfully
- ✅ **Database seeding** configured and tested with sample data

### 2. Prisma 7 Migration
- ✅ Updated to **Prisma 7.2.0** (CLI + Client)
- ✅ Installed and configured **PostgreSQL adapter** (`@prisma/adapter-pg` + `pg`)
- ✅ Updated **PrismaService** to use the adapter
- ✅ Added `tsx` for better TypeScript execution

### 3. GraphQL Schema
- ✅ **Comprehensive GraphQL schema** updated with all new types:
  - Payment, Shipment, Discount, Tag types
  - ProductImage type  
  - Updated enums (PaymentStatus, PaymentMethod, ShipmentStatus, DiscountType)
  - New input types for all operations
  - Expanded queries and mutations

---

## 🔄 Pending Tasks

### High Priority

#### 1. Create Resolvers for New Features

**Payment Resolvers** (`src/payment/`)
```typescript
// payment.service.ts - Create service with methods:
- createPayment(orderId, amount, method, ...)
- getPayment(id)
- getOrderPayments(orderId)
- refundPayment(id, amount, reason)

// payment.resolver.ts - Create resolver with queries/mutations:
- payment(id)
- orderPayments(orderId)
- createPayment(input)
- refundPayment(id, amount, reason)

// payment.module.ts - Create module
```

**Shipment Resolvers** (`src/shipment/`)
```typescript
// shipment.service.ts - Create service with methods:
- createShipment(orderId, addressId, ...)
- getShipment(id)
- getOrderShipments(orderId)
- trackShipment(trackingNumber)
- updateShipment(id, data)

// shipment.resolver.ts - Create resolver
// shipment.module.ts - Create module
```

**Discount Resolvers** (`src/discount/`)
```typescript
// discount.service.ts - Create service with methods:
- createDiscount(code, type, value, ...)
- getDiscount(id or code)
- listDiscounts(filters)
- validateDiscount(code, orderTotal)
- applyDiscount(orderId, code)
- updateDiscount(id, data)
- deleteDiscount(id)

// discount.resolver.ts - Create resolver
// discount.module.ts - Create module
```

**Tag Resolvers** (`src/tag/`)
```typescript
// tag.service.ts - Create service with methods:
- createTag(name, slug)
- getTag(id or slug)
- listTags()
- updateTag(id, data)
- deleteTag(id)

// tag.resolver.ts - Create resolver
// tag.module.ts - Create module
```

#### 2. Update Existing Resolvers

**Product Resolver** (`src/product/product.resolver.ts`)
- Update to handle product images (separate table)
- Update to handle many-to-many categories
- Add tag operations
- Update to include new fields (shortDesc, comparePrice, costPrice, inventory, dimensions)

**Order Resolver** (`src/order/order.resolver.ts`)
- Update to include payments relation
- Update to include shipments relation
- Update to include discount relation
- Add orderNumber generation
- Handle new fields (customerNote, adminNote, discountAmount)

**Review Resolver** (`src/review/review.resolver.ts`)
- Add title field support
- Add helpfulCount and markReviewHelpful mutation
- Add adminResponse functionality
- Add respondToReview mutation

#### 3. Update Services

**Product Service** (`src/product/product.service.ts`)
- Update create/update methods for images
- Update create/update methods for categories (many-to-many)
- Add tag operations
- Update to use new Prisma schema fields

**Order Service** (`src/order/order.service.ts`)
- Integrate payment creation
- Integrate shipment creation
- Add discount validation and application
- Generate unique orderNumber

**Review Service** (`src/review/review.service.ts`)
- Add title field
- Add helpfulCount increment
- Add adminResponse functionality

#### 4. Register New Modules

Update `src/app.module.ts`:
```typescript
import { PaymentModule } from './payment/payment.module';
import { ShipmentModule } from './shipment/shipment.module';
import { DiscountModule } from './discount/discount.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    // ... existing modules
    PaymentModule,
    ShipmentModule,
    DiscountModule,
    TagModule,
  ],
})
export class AppModule {}
```

---

### Medium Priority

#### 5. Update SDK Package

**Add New Service Folders** (`packages/sdk/src/services/`)

**Payments**
```typescript
// services/payments/queries.ts
- usePayment(id)
- useOrderPayments(orderId)

// services/payments/mutations.ts
- useCreatePayment()
- useRefundPayment()
```

**Shipments**
```typescript
// services/shipments/queries.ts
- useShipment(id)
- useOrderShipments(orderId)
- useTrackShipment(trackingNumber)

// services/shipments/mutations.ts
- useCreateShipment()
- useUpdateShipment()
```

**Discounts**
```typescript
// services/discounts/queries.ts
- useDiscounts(filters)
- useDiscount(id or code)
- useValidateDiscount(code, orderTotal)

// services/discounts/mutations.ts
- useCreateDiscount()
- useUpdateDiscount()
- useDeleteDiscount()
```

**Tags**
```typescript
// services/tags/queries.ts
- useTags()
- useTag(id or slug)

// services/tags/mutations.ts
- useCreateTag()
- useUpdateTag()
- useDeleteTag()
```

**Update Existing Services**
- Update `services/products/` to include images, tags, new fields
- Update `services/orders/` to include payments, shipments, discount
- Update `services/reviews/` to include title, helpful, admin response

#### 6. Update GraphQL Operations

Create new GraphQL operation files in `packages/sdk/src/graphql/`:
- `payment.graphql` - Payment queries and mutations
- `shipment.graphql` - Shipment queries and mutations
- `discount.graphql` - Discount queries and mutations
- `tag.graphql` - Tag queries and mutations

Update existing files:
- `product.graphql` - Add new fields and relations
- `order.graphql` - Add payments, shipments, discount relations
- `review.graphql` - Add new fields (title, helpfulCount, adminResponse)

---

### Low Priority

#### 7. Update Documentation

- Update `apps/docs/backend.md` with new modules
- Update `apps/docs/services_package.md` with new SDK services
- Update `apps/docs/database_schema.md` with new tables
- Create `apps/docs/payment_flow.md` - Document payment processing
- Create `apps/docs/shipment_tracking.md` - Document shipment workflow
- Create `apps/docs/discount_system.md` - Document discount logic

#### 8. Update Admin Panel

When working on `apps/admin`:
- Add payment management UI
- Add shipment tracking UI
- Add discount management UI
- Add tag management UI
- Update product form for new fields

#### 9. Update Web Store

When working on `apps/web`:
- Display product images from new table
- Show multiple categories per product
- Display product tags
- Add discount code input on checkout
- Display shipment tracking
- Update review form with title field

---

## 📋 Implementation Order

Recommended order to implement remaining tasks:

1. **Phase 1: Core Resolvers** (Essential for basic functionality)
   - Tag resolvers (simplest, good starting point)
   - Discount resolvers (needed for checkout)
   - Payment resolvers (critical for orders)
   - Shipment resolvers (critical for fulfillment)

2. **Phase 2: Update Existing** (Enhance current features)
   - Update Product resolver and service
   - Update Order resolver and service
   - Update Review resolver and service
   - Register all modules in AppModule

3. **Phase 3: SDK Integration** (Frontend connectivity)
   - Add new SDK services
   - Create GraphQL operations
   - Update existing SDK services
   - Test with frontend

4. **Phase 4: Polish** (Documentation and UI)
   - Update documentation
   - Update admin panel
   - Update web store
   - End-to-end testing

---

## 🚀 Quick Start Commands

### Start Development
```bash
# Terminal 1: Start database
docker-compose up -d

# Terminal 2: Start backend
cd apps/server
pnpm dev

# Terminal 3: View database
cd apps/server
pnpm prisma studio
```

### Database Commands
```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed database
pnpm prisma:seed

# Reset database (drops + migrates + seeds)
pnpm prisma migrate reset
```

---

## 📝 Code Templates

### Creating a New Resolver Module

**1. Create Service** (`src/[module]/[module].service.ts`)
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class [Module]Service {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    return this.prisma.[model].findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.[model].findMany();
  }

  async create(data: any) {
    return this.prisma.[model].create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.[model].update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.[model].delete({ where: { id } });
  }
}
```

**2. Create Resolver** (`src/[module]/[module].resolver.ts`)
```typescript
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { [Module]Service } from './[module].service';

@Resolver('[Model]')
export class [Module]Resolver {
  constructor(private [module]Service: [Module]Service) {}

  @Query('[model]')
  async get[Model](@Args('id') id: string) {
    return this.[module]Service.findOne(id);
  }

  @Query('[models]')
  async get[Models]() {
    return this.[module]Service.findAll();
  }

  @Mutation('create[Model]')
  @UseGuards(JwtAuthGuard)
  async create[Model](@Args('input') input: any) {
    return this.[module]Service.create(input);
  }

  @Mutation('update[Model]')
  @UseGuards(JwtAuthGuard)
  async update[Model](
    @Args('id') id: string,
    @Args('input') input: any,
  ) {
    return this.[module]Service.update(id, input);
  }

  @Mutation('delete[Model]')
  @UseGuards(JwtAuthGuard)
  async delete[Model](@Args('id') id: string) {
    await this.[module]Service.delete(id);
    return true;
  }
}
```

**3. Create Module** (`src/[module]/[module].module.ts`)
```typescript
import { Module } from '@nestjs/common';
import { [Module]Service } from './[module].service';
import { [Module]Resolver } from './[module].resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [[Module]Service, [Module]Resolver],
  exports: [[Module]Service],
})
export class [Module]Module {}
```

---

## 🔗 Useful Resources

- [Prisma 7 Docs](https://www.prisma.io/docs)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [React Query](https://tanstack.com/query/latest)

---

## ⚠️ Important Notes

1. **Prisma Client Generation**: After any schema changes, run `pnpm prisma generate`
2. **Database Adapter**: The PrismaService now requires the PostgreSQL adapter
3. **GraphQL Schema**: Keep `schema.gql` in sync with Prisma schema
4. **Authentication**: Use `@UseGuards(JwtAuthGuard)` for protected mutations
5. **Error Handling**: Add try-catch blocks in services for better error messages

---

## 📊 Current Progress

- **Database**: 100% ✅
- **GraphQL Schema**: 100% ✅  
- **Resolvers**: 30% ⚠️ (Cart, Order, Review exist; Payment, Shipment, Discount, Tag need creation)
- **SDK**: 20% ⚠️ (Auth, Products, Cart exist; new services needed)
- **Documentation**: 60% ⚠️ (Core docs exist; new features need docs)

---

**Ready to continue development!** Start with Phase 1 resolvers for the best results. 🚀

