# Apps Architecture

## Overview

The React Ecommerce Boilerplate uses a **multi-app monorepo architecture** with two separate Next.js applications sharing common packages.

```
react-ecommerce/
├── apps/
│   ├── web/          → Customer-facing store
│   ├── admin/        → Admin dashboard
│   └── server/       → Backend API (NestJS)
├── packages/
│   ├── sdk/          → Shared API client & hooks
│   └── design-system/→ Shared UI components
```

---

## 🛍️ Web App (Customer-Facing Store)

### Purpose

Public ecommerce store where customers browse, shop, and manage their accounts.

### Target Users

- Customers (anonymous & registered)
- Guest shoppers

### Key Features

- Product browsing & search
- Shopping cart & checkout
- User authentication & profiles
- Order tracking
- Product reviews
- Wishlist

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS
- **State**: React Query (via SDK)
- **Auth**: JWT tokens
- **Fonts**: Poppins

### URL Structure

```
/                    → Home page
/products            → Product listing
/products/:slug      → Product detail
/cart                → Shopping cart
/checkout            → Checkout flow
/login               → Customer login
/register            → Customer registration
/account             → User dashboard
/account/orders      → Order history
/account/profile     → Profile settings
/account/addresses   → Address book
```

### Deployment

- **Production URL**: `https://store.example.com`
- **Development**: `http://localhost:3000`

---

## 👨‍💼 Admin App (Admin Dashboard)

### Purpose

Internal management system for store administrators to manage products, orders, customers, and settings.

### Target Users

- Super Admins (full access)
- Admins (manage products, orders)
- Editors (content management)
- Viewers (read-only access)

### Key Features

- Product management (CRUD)
- Order processing & fulfillment
- Customer management
- Analytics & reports
- Store settings
- Discount codes
- Content management

### Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS
- **State**: React Query (via SDK)
- **Auth**: JWT tokens + Role-based access control
- **Charts**: Recharts / Chart.js
- **Tables**: TanStack Table
- **Forms**: React Hook Form + Zod
- **Editor**: TipTap (rich text)

### URL Structure

```
/                    → Dashboard overview
/login               → Admin login
/products            → Product list
/products/new        → Add product
/products/:id        → Edit product
/orders              → Order list
/orders/:id          → Order details
/customers           → Customer list
/customers/:id       → Customer details
/analytics           → Reports & analytics
/settings            → Store settings
/users               → Admin users
```

### Deployment

- **Production URL**: `https://admin.example.com`
- **Development**: `http://localhost:3002`

---

## 🔧 Server App (Backend API)

### Purpose

RESTful API that serves both web and admin apps.

### Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Auth**: JWT + Passport.js
- **Validation**: class-validator

### URL Structure

```
/api/auth/login       → Authentication
/api/auth/register    → User registration
/api/auth/refresh     → Token refresh
/api/products         → Products CRUD
/api/categories       → Categories CRUD
/api/orders           → Orders CRUD
/api/cart             → Cart management
/api/users            → User management
```

### Deployment

- **Production URL**: `https://api.example.com`
- **Development**: `http://localhost:5001`

---

## 📦 Shared Packages

### SDK (`@react-shop/sdk`)

**Purpose**: Shared API client and React Query hooks

**Used by**:

- ✅ Web app
- ✅ Admin app
- ❌ Server (server doesn't need SDK)

**Exports**:

```typescript
// Entities (Types)
import { User, Product, Order } from "@react-shop/sdk";

// Query Hooks
import { useProductList, useProductDetail } from "@react-shop/sdk";

// Mutation Hooks
import { useLogin, useAddToCart } from "@react-shop/sdk";

// Providers
import { SdkProvider } from "@react-shop/sdk";

// Token Management
import { setToken, getStoredToken } from "@react-shop/sdk";
```

### Design System (`@react-shop/design-system`)

**Purpose**: Shared UI components and styling

**Used by**:

- ✅ Web app (customer-facing UI)
- ✅ Admin app (admin UI)
- ❌ Server (no UI)

**Exports**:

```typescript
// Atoms
import { Button, Input, Badge, Avatar } from "@react-shop/design-system";

// Molecules
import { Select, Toast, PriceDisplay } from "@react-shop/design-system";

// Organisms
import { ProductCard, Modal } from "@react-shop/design-system";

// Layouts
import { Container, Flex, Grid } from "@react-shop/design-system";

// Utilities
import { cn } from "@react-shop/design-system";
```

---

## 🔀 Data Flow

### Customer Shopping Flow

```
Customer
   ↓
Web App (browse products)
   ↓
SDK (useProductList hook)
   ↓
Server API (GET /api/products)
   ↓
Prisma → PostgreSQL
   ↓
Response → SDK → Web App → Customer
```

### Admin Management Flow

```
Admin
   ↓
Admin App (edit product)
   ↓
SDK (useUpdateProduct hook)
   ↓
Server API (PUT /api/products/:id)
   ↓
Prisma → PostgreSQL
   ↓
Response → SDK → Admin App → Admin
```

---

## 🔐 Authentication

### Web App (Customer Auth)

- **Method**: JWT (access + refresh tokens)
- **Storage**: localStorage + memory
- **Roles**: `CUSTOMER`
- **Protected Routes**: `/account/*`

### Admin App (Admin Auth)

- **Method**: JWT (access + refresh tokens)
- **Storage**: localStorage + memory
- **Roles**: `SUPER_ADMIN`, `ADMIN`, `EDITOR`, `VIEWER`
- **Protected Routes**: All routes (except `/login`)
- **Permissions**: Role-based access control

### Token Refresh

Both apps use the same automatic token refresh mechanism:

```
Request (401) → Refresh Token → New Access Token → Retry Request
```

---

## 🎨 UI/UX Differences

### Web App UI

- **Design**: Customer-focused, sales-oriented
- **Layout**: Marketing-style layouts, product grids
- **Colors**: Brand colors, vibrant
- **Components**: Product cards, hero banners, carousels
- **Mobile**: Mobile-first, touch-friendly
- **SEO**: Critical (needs to rank)

### Admin App UI

- **Design**: Data-heavy, functional
- **Layout**: Sidebar navigation, data tables
- **Colors**: Neutral, professional
- **Components**: Tables, forms, charts, dashboards
- **Mobile**: Desktop-first (mobile support optional)
- **SEO**: Not needed (internal use)

---

## 📊 Performance Considerations

### Web App

- **Critical**: Page load speed, SEO, Core Web Vitals
- **Optimization**:
  - Image optimization (Next.js Image)
  - Code splitting
  - Static generation where possible
  - CDN caching
  - Service worker (PWA)

### Admin App

- **Critical**: Data loading speed, interaction responsiveness
- **Optimization**:
  - Virtual scrolling for large tables
  - Debounced search
  - Optimistic updates
  - Request caching
  - Pagination

---

## 🚀 Deployment Strategy

### Option 1: Separate Domains (Recommended)

```
Web:    https://store.example.com
Admin:  https://admin.example.com
API:    https://api.example.com
```

**Pros:**

- Clear separation
- Independent scaling
- Better security (admin isolated)
- Different CDN strategies

### Option 2: Subdirectories

```
Web:    https://example.com
Admin:  https://example.com/admin
API:    https://example.com/api
```

**Pros:**

- Single domain
- Simplified SSL
- Easier CORS

### Option 3: Separate Ports (Development Only)

```
Web:    http://localhost:3000
Admin:  http://localhost:3002
API:    http://localhost:5001
```

---

## 🔧 Development Workflow

### Starting All Apps

```bash
# From root
pnpm dev

# This starts:
# - apps/web    → http://localhost:3000
# - apps/admin  → http://localhost:3002
# - apps/server → http://localhost:5001
```

### Starting Individual Apps

```bash
# Web only
cd apps/web && pnpm dev

# Admin only
cd apps/admin && pnpm dev

# Server only
cd apps/server && pnpm dev
```

### Making Changes to Shared Packages

Changes to SDK or Design System are automatically hot-reloaded in all apps (thanks to Turborepo).

---

## 📝 Summary

| Aspect         | Web App      | Admin App   | Server       |
| -------------- | ------------ | ----------- | ------------ |
| **Users**      | Customers    | Admins      | N/A (API)    |
| **Purpose**    | Shopping     | Management  | Data & Logic |
| **Framework**  | Next.js 14+  | Next.js 14+ | NestJS       |
| **Auth**       | JWT          | JWT + RBAC  | Passport.js  |
| **SEO**        | Critical     | Not needed  | N/A          |
| **Mobile**     | Mobile-first | Optional    | N/A          |
| **Port (dev)** | 3000         | 3002        | 5001         |
| **Uses SDK**   | ✅ Yes       | ✅ Yes      | ❌ No        |
| **Uses DS**    | ✅ Yes       | ✅ Yes      | ❌ No        |

---

## 🤝 Best Practices

1. **Shared Logic** → Put in SDK
2. **Shared UI** → Put in Design System
3. **App-Specific Logic** → Keep in respective app
4. **Types** → Define in SDK entities
5. **Validation** → Backend (NestJS DTOs) + Frontend (Zod)
6. **Error Handling** → Consistent across apps
7. **Testing** → Test SDK/DS separately, then integration

---

## 📚 Next Steps

1. ✅ Setup foundation (SDK, Design System, fonts)
2. [ ] Build Web App features (see `apps/web/FEATURES.md`)
3. [ ] Build Admin App features (see `apps/admin/FEATURES.md`)
4. [ ] Deploy to production

Both apps can be developed in parallel by different teams since they share the same backend API and packages! 🚀
