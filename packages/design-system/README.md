# @react-shop/design-system

A comprehensive, themeable design system built with PandaCSS for the React Ecommerce platform.

## Features

- 🎨 Token-based design system
- 🌓 Light/dark mode support
- 📱 Responsive components
- 🛍️ Ecommerce-specific components
- ⚡ Zero-runtime CSS generation
- 🔧 TypeScript support

## Installation

```bash
pnpm add @react-shop/design-system
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
      id="product-1"
      name="Premium T-Shirt"
      price={29.99}
      originalPrice={39.99}
      image="/product.jpg"
      rating={4.5}
      reviewCount={128}
      badge="Sale"
      onAddToCart={(id) => console.log('Add to cart:', id)}
      onClick={(id) => console.log('View product:', id)}
    />
  );
}
```

### Layout Components

```typescript
import { Container, Stack, Grid, Flex } from '@react-shop/design-system';

function Layout() {
  return (
    <Container maxWidth="1280px">
      <Stack direction="column" spacing="4">
        <Flex justify="between" align="center">
          <div>Logo</div>
          <div>Menu</div>
        </Flex>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap="4">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </Grid>
      </Stack>
    </Container>
  );
}
```

### Using PandaCSS Utilities

```typescript
import { css } from '@react-shop/design-system';

function CustomComponent() {
  return (
    <div className={css({
      bg: 'bg.surface',
      p: '4',
      borderRadius: 'lg',
      boxShadow: 'md',
    })}>
      Custom styled component
    </div>
  );
}
```

## Components

### Layout
- `Box` - Basic building block
- `Container` - Centered container with max-width
- `Flex` - Flexbox container
- `Grid` - CSS Grid container
- `Stack` - Flex container with spacing

### Typography
- `Heading` - Heading component (h1-h6)
- `Text` - Text component with variants

### Display
- `Button` - Button with variants and sizes
- `Badge` - Badge/tag component
- `Card` - Card container

### Forms
- `Input` - Text input with variants

### Ecommerce
- `ProductCard` - Product display card
- `PriceDisplay` - Price with discount display
- `Rating` - Star rating display

## Theming

### Design Tokens

The design system uses a token-based approach:

```typescript
// Colors
colors.brand.500      // Primary brand color
colors.neutral.900    // Dark neutral
colors.success.500    // Success color
colors.error.500      // Error color

// Semantic tokens (theme-aware)
bg.canvas             // Background color
bg.surface            // Surface color
text.primary          // Primary text color
text.secondary        // Secondary text color
border.default        // Border color

// Spacing
spacing.4             // 16px
spacing.8             // 32px

// Font sizes
fontSize.md           // 16px
fontSize.xl           // 20px

// Border radius
radii.md              // 6px
radii.lg              // 8px
```

### Theme Switching

```typescript
// Set theme on document
document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');
```

## Customization

### Extending the Theme

Create a custom `panda.config.ts` in your app:

```typescript
import { defineConfig } from '@pandacss/dev';
import baseConfig from '@react-shop/design-system/panda.config';

export default defineConfig({
  ...baseConfig,
  theme: {
    extend: {
      tokens: {
        colors: {
          brand: {
            500: { value: '#your-color' },
          },
        },
      },
    },
  },
});
```

### Creating Custom Recipes

```typescript
import { cva } from '@react-shop/design-system';

export const myRecipe = cva({
  base: {
    padding: '4',
    borderRadius: 'md',
  },
  variants: {
    variant: {
      primary: {
        bg: 'brand.500',
        color: 'white',
      },
      secondary: {
        bg: 'neutral.200',
        color: 'neutral.900',
      },
    },
  },
});
```

## Development

```bash
# Install dependencies
pnpm install

# Generate PandaCSS
pnpm prepare

# Lint
pnpm lint
```

## TypeScript

All components are fully typed. Import types:

```typescript
import type { ButtonProps, CardProps } from '@react-shop/design-system';
```

## License

MIT

