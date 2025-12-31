# @react-shop/design-system

A comprehensive, themeable design system built with **TailwindCSS** and **tailwind-variants** for the React Ecommerce platform.

## Features

- 🎨 Token-based design system with Tailwind
- 🌓 Light/dark mode support
- 📱 Responsive components with Tailwind breakpoints
- 🛍️ Ecommerce-specific components
- ⚡ Utility-first CSS with zero runtime
- 🔧 Full TypeScript support
- 🎯 Beginner-friendly and industry-standard

## Installation

```bash
pnpm add @react-shop/design-system
```

## Setup

### 1. Import Global Styles

In your app root (e.g., `app/layout.tsx`):

```typescript
import '@react-shop/design-system/src/styles/global.css';
```

### 2. Configure Tailwind (if using in your app)

In your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import designSystemConfig from '@react-shop/design-system/tailwind.config';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [designSystemConfig],
};

export default config;
```

## Usage

### Basic Components

```typescript
import { Button, Card, Text, Heading } from '@react-shop/design-system';

function MyComponent() {
  return (
    <Card variant="elevated" padding="md">
      <Heading as="h2" size="xl">Welcome</Heading>
      <Text size="md">This is a card component</Text>
      <Button variant="solid" size="md">Click Me</Button>
    </Card>
  );
}
```

### Ecommerce Components

```typescript
import { ProductCard, PriceDisplay, Rating } from '@react-shop/design-system';

function ProductList() {
  return (
    <ProductCard
      image="/product.jpg"
      title="Premium T-Shirt"
      price={29.99}
      originalPrice={39.99}
      rating={4.5}
      reviewCount={128}
      badge="Sale"
      onAddToCart={() => console.log('Add to cart')}
    />
  );
}
```

### Layout Components

```typescript
import { Container, Stack, Grid, Flex } from '@react-shop/design-system';

function Layout() {
  return (
    <Container maxWidth="xl">
      <Stack className="gap-4">
        <Flex className="justify-between items-center">
          <div>Logo</div>
          <div>Menu</div>
        </Flex>
        <Grid className="grid-cols-3 gap-4">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      </Stack>
    </Container>
  );
}
```

### Using Tailwind Classes

```typescript
import { cn } from '@react-shop/design-system';

function CustomComponent() {
  return (
    <div className={cn(
      'bg-white p-4 rounded-lg shadow-md',
      'hover:shadow-lg transition-shadow'
    )}>
      Custom styled component
    </div>
  );
}
```

### Using tailwind-variants for Custom Components

```typescript
import { tv } from 'tailwind-variants';
import { cn } from '@react-shop/design-system';

const myComponent = tv({
  base: 'p-4 rounded-md transition-all',
  variants: {
    variant: {
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    },
    size: {
      sm: 'text-sm px-3 py-2',
      md: 'text-base px-4 py-3',
      lg: 'text-lg px-6 py-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

function MyComponent({ variant, size, className }) {
  return (
    <div className={cn(myComponent({ variant, size }), className)}>
      Content
    </div>
  );
}
```

## Components

### Atoms (15)

#### Layout
- `Box` - Basic building block
- `Container` - Centered container with responsive max-width
- `Flex` - Flexbox container
- `Grid` - CSS Grid container
- `Stack` - Vertical flex container

#### Typography
- `Heading` - Heading component (h1-h6) with sizes
- `Text` - Text component with variants, sizes, colors

#### Display
- `Avatar` - User avatar with image, initials, or icon fallback
- `Badge` - Badge/tag component with variants and color schemes
- `Card` - Card container with elevation, outline, or filled variants
- `Divider` - Horizontal or vertical divider

#### Forms
- `Button` - Button with variants (solid, outline, ghost) and sizes
- `Input` - Text input with variants (outline, filled) and validation states

#### Feedback
- `Skeleton` - Loading skeleton with text, circular, rectangular variants

#### Media
- `Icon` - Lucide icon wrapper with sizes and colors

### Molecules (4)

- `PriceDisplay` - Price with discount display, currency formatting
- `Rating` - Star rating display with interactive and readonly modes
- `Select` - Dropdown select with variants and validation
- `Toast` - Notification toast with variants (success, error, warning, info)

### Organisms (2)

- `Modal` - Modal dialog with sizes, overlay, close button
- `ProductCard` - Complete product card with image, title, price, rating, badge, and add-to-cart button

## Theming

### Design Tokens (Tailwind Config)

The design system uses Tailwind's token-based approach:

```typescript
// Colors (defined in tailwind.config.ts)
'bg-brand-500'          // Primary brand color
'text-gray-900'         // Dark text
'bg-success-500'        // Success background
'border-error-500'      // Error border

// Spacing
'p-4'                   // padding: 1rem (16px)
'gap-6'                 // gap: 1.5rem (24px)
'm-2'                   // margin: 0.5rem (8px)

// Typography
'text-base'             // 16px
'text-xl'               // 20px
'font-semibold'         // 600

// Borders
'rounded-md'            // 6px
'rounded-lg'            // 8px
'border'                // 1px solid

// Responsive
'md:text-lg'            // Large text on medium screens
'lg:grid-cols-3'        // 3 columns on large screens
```

### Responsive Breakpoints

```typescript
// Mobile-first approach
sm: '640px'     // Small devices
md: '768px'     // Tablets
lg: '1024px'    // Laptops
xl: '1280px'    // Desktops
2xl: '1536px'   // Large desktops

// Usage
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### Custom Colors

The design system provides:

- **Brand colors**: `brand-{50-950}`
- **Primary colors**: `primary-{50-900}` (default: blue)
- **Success colors**: `success-{50-900}` (green)
- **Error colors**: `error-{50-900}` (red)
- **Warning colors**: `warning-{50-900}` (amber)

## Customization

### Extending the Theme

Update `tailwind.config.ts` in your app:

```typescript
import type { Config } from 'tailwindcss';
import designSystemConfig from '@react-shop/design-system/tailwind.config';

const config: Config = {
  presets: [designSystemConfig],
  theme: {
    extend: {
      colors: {
        // Override or add custom colors
        brand: {
          500: '#your-color',
        },
      },
      fontFamily: {
        // Add custom fonts
        custom: ['Your Font', 'sans-serif'],
      },
    },
  },
};

export default config;
```

### Utility Functions

#### `cn()` - Class Name Merger

Combines `clsx` and `tailwind-merge` for optimal class handling:

```typescript
import { cn } from '@react-shop/design-system';

// Merge classes, handle conditionals, resolve conflicts
cn(
  'base-class',
  condition && 'conditional-class',
  'p-4',
  'p-6',  // ← This wins (p-6 overrides p-4)
  className
)
```

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook
pnpm storybook

# Lint
pnpm lint

# Build Storybook
pnpm build-storybook
```

## TypeScript

All components are fully typed with TypeScript:

```typescript
import type { 
  ButtonProps, 
  ButtonVariants,
  CardProps,
  ProductCardProps 
} from '@react-shop/design-system';

// Use with your own components
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}
```

## Storybook

View all components in Storybook:

```bash
cd packages/design-system
pnpm storybook
```

Visit: `http://localhost:6006`

## VS Code Setup

For the best development experience, install:

1. **Tailwind CSS IntelliSense** by Tailwind Labs
   - Autocomplete for Tailwind classes
   - Hover previews for colors and sizes
   - Linting for class names

2. **Prettier - Code formatter**
   - With `prettier-plugin-tailwindcss` for class sorting

## Migration from PandaCSS

If you're upgrading from a previous version using PandaCSS, see:
- `TAILWIND_MIGRATION.md` for complete migration guide

## License

MIT

---

## Quick Links

- 📚 [Tailwind Documentation](https://tailwindcss.com/docs)
- 🎨 [Tailwind Variants](https://www.tailwind-variants.org/)
- 🔀 [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
- 📖 [Full Migration Guide](./TAILWIND_MIGRATION.md)
