# Web App - Customer Ecommerce

Customer-facing ecommerce application built with Next.js 14+, React 19, and PandaCSS.

## Tech Stack

- **Next.js 14+** - App Router, Server Components, Streaming
- **React 19** - Latest React features
- **TypeScript 5+** - Type safety
- **PandaCSS** - Zero-runtime CSS-in-JS (via Design System)
- **React Query** - Server state management (via SDK)
- **React Hook Form + Zod** - Form handling and validation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Backend server running on `http://localhost:5001`

### Setup

1. **Install dependencies**

```bash
cd apps/web
pnpm install
```

2. **Create environment file**

Create `.env.local` in `apps/web/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

See `ENV_SETUP.md` for all available environment variables.

3. **Start development server**

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Development

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout with providers
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── layout/          # Layout components (Header, Footer)
│   └── product/         # Product components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and helpers
└── styles/              # Additional styles
```

### Adding Pages

Create new pages in `src/app/`:

```typescript
// src/app/products/page.tsx
export default function ProductsPage() {
  return <div>Products</div>;
}
```

### Using Design System

Import components from `@react-shop/design-system`:

```typescript
import { Button, Card, Heading } from '@react-shop/design-system';

export default function MyComponent() {
  return (
    <Card>
      <Heading>Hello</Heading>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Using SDK

Import hooks from `@react-shop/sdk`:

```typescript
'use client';

import { useProducts, useAddToCart } from '@react-shop/sdk';

export default function ProductList() {
  const { data: products, isLoading } = useProducts();
  const addToCart = useAddToCart();

  // ... use products and addToCart
}
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Features

See `FEATURES_WEB.md` for the complete feature roadmap.

### Phase 1 (Current)
- ✅ Setup Next.js 14+ and React 19
- ✅ Configure SDK providers
- ✅ Create home page
- ✅ Test Design System components
- 🚧 Test SDK integration with backend

## Environment Variables

All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

See `ENV_SETUP.md` for details.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

### Other Platforms

```bash
pnpm build
pnpm start
```

## Troubleshooting

### Module not found errors

```bash
pnpm install
```

### SDK hooks not working

1. Ensure backend is running on `http://localhost:5001`
2. Check `NEXT_PUBLIC_API_URL` in `.env.local`
3. Verify `SdkProvider` is in root layout

### Design System styles not loading

1. Check PandaCSS is installed in design-system package
2. Verify `transpilePackages` in `next.config.js`
3. Clear `.next` folder and rebuild

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Documentation](https://react.dev)
- [PandaCSS Documentation](https://panda-css.com)
