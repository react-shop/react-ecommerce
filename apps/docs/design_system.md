# Design System

The design system is built with PandaCSS, providing zero-runtime, type-safe styling with theme support.

## Overview

- **Package**: `@react-shop/design-system`
- **Styling**: PandaCSS (zero-runtime CSS-in-JS)
- **Theming**: Light/dark mode with semantic tokens
- **TypeScript**: Full type safety
- **RSC Compatible**: Works with React Server Components

## Installation

In your Next.js app:

```bash
yarn add @react-shop/design-system
```

## Setup

### 1. Configure PandaCSS

Create `panda.config.ts` in your app:

```typescript
import { defineConfig } from '@pandacss/dev';
import baseConfig from '@react-shop/design-system/panda.config';

export default defineConfig({
  ...baseConfig,
  // Extend or override as needed
  include: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
});
```

### 2. Add PandaCSS to package.json

```json
{
  "scripts": {
    "prepare": "panda codegen",
    "dev": "panda codegen && next dev"
  },
  "devDependencies": {
    "@pandacss/dev": "^0.40.0"
  }
}
```

### 3. Import Global Styles

```typescript
// app/layout.tsx
import '../styled-system/styles.css';
```

## Design Tokens

### Colors

```typescript
// Brand colors
colors.brand.50 → #f0f9ff
colors.brand.500 → #0ea5e9
colors.brand.900 → #0c4a6e

// Neutral colors
colors.neutral.50 → #fafafa
colors.neutral.500 → #737373
colors.neutral.900 → #171717

// Status colors
colors.success.500 → #22c55e
colors.error.500 → #ef4444
colors.warning.500 → #f59e0b
```

### Semantic Colors (Theme-Aware)

```typescript
// Backgrounds
bg.canvas    // Base background
bg.surface   // Surface background
bg.muted     // Muted background

// Text
text.primary   // Primary text
text.secondary // Secondary text
text.tertiary  // Tertiary text

// Borders
border.default // Default border
border.muted   // Muted border
```

### Typography

```typescript
// Font families
fonts.heading → System heading font
fonts.body → System body font
fonts.mono → Monospace font

// Font sizes
fontSize.xs → 12px
fontSize.sm → 14px
fontSize.md → 16px
fontSize.lg → 18px
fontSize.xl → 20px
fontSize.2xl → 24px
// ... up to 7xl

// Font weights
fontWeight.light → 300
fontWeight.normal → 400
fontWeight.medium → 500
fontWeight.semibold → 600
fontWeight.bold → 700
```

### Spacing

```typescript
spacing.0 → 0
spacing.1 → 4px
spacing.2 → 8px
spacing.4 → 16px
spacing.8 → 32px
spacing.16 → 64px
// ... and more
```

### Border Radius

```typescript
radii.none → 0
radii.sm → 2px
radii.md → 6px
radii.lg → 8px
radii.xl → 12px
radii.full → 9999px
```

## Components

### Layout Components

#### Box

Basic building block for layouts:

```typescript
import { Box } from '@react-shop/design-system';

<Box bg="bg.surface" p="4" borderRadius="lg">
  Content here
</Box>
```

#### Container

Centered container with max-width:

```typescript
import { Container } from '@react-shop/design-system';

<Container maxWidth="1280px">
  Page content
</Container>
```

#### Flex

Flexbox container:

```typescript
import { Flex } from '@react-shop/design-system';

<Flex justify="between" align="center" gap="4">
  <div>Left</div>
  <div>Right</div>
</Flex>
```

#### Grid

CSS Grid container:

```typescript
import { Grid } from '@react-shop/design-system';

<Grid gridTemplateColumns="repeat(3, 1fr)" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

#### Stack

Flex container with automatic spacing:

```typescript
import { Stack } from '@react-shop/design-system';

<Stack direction="column" spacing="4">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Typography

#### Heading

```typescript
import { Heading } from '@react-shop/design-system';

<Heading as="h1" size="2xl" weight="bold">
  Page Title
</Heading>
```

Props:
- `as`: h1-h6
- `size`: xs, sm, md, lg, xl, 2xl-6xl
- `weight`: normal, medium, semibold, bold

#### Text

```typescript
import { Text } from '@react-shop/design-system';

<Text size="md" weight="normal" align="left">
  Body text
</Text>
```

Props:
- `as`: p, span, div, label
- `size`: xs, sm, md, lg, xl
- `weight`: light, normal, medium, semibold, bold
- `align`: left, center, right

### Display Components

#### Button

```typescript
import { Button } from '@react-shop/design-system';

<Button 
  variant="solid" 
  size="md" 
  fullWidth={false}
  leftIcon={<IconLeft />}
  rightIcon={<IconRight />}
  isLoading={false}
  onClick={handleClick}
>
  Click Me
</Button>
```

Variants:
- `solid` - Filled button (default)
- `outline` - Outlined button
- `ghost` - Transparent button
- `link` - Link-styled button

Sizes:
- `sm` - Small
- `md` - Medium (default)
- `lg` - Large

#### Card

```typescript
import { Card } from '@react-shop/design-system';

<Card variant="elevated" padding="md">
  Card content
</Card>
```

Variants:
- `outline` - Bordered card (default)
- `elevated` - Card with shadow

Padding:
- `none`, `sm`, `md`, `lg`

#### Badge

```typescript
import { Badge } from '@react-shop/design-system';

<Badge variant="solid" colorScheme="success">
  New
</Badge>
```

Variants:
- `solid` - Filled
- `subtle` - Subtle background
- `outline` - Outlined

Color schemes:
- `brand`, `success`, `error`, `warning`

### Form Components

#### Input

```typescript
import { Input } from '@react-shop/design-system';

<Input
  type="text"
  placeholder="Enter text"
  size="md"
  variant="outline"
  disabled={false}
/>
```

### Ecommerce Components

#### ProductCard

Complete product card with image, name, price, rating:

```typescript
import { ProductCard } from '@react-shop/design-system';

<ProductCard
  id="product-1"
  name="Premium T-Shirt"
  price={29.99}
  originalPrice={39.99}
  image="/product.jpg"
  rating={4.5}
  reviewCount={128}
  badge="Sale"
  inStock={true}
  onAddToCart={(id) => addToCart(id)}
  onClick={(id) => viewProduct(id)}
/>
```

#### PriceDisplay

Formatted price with discount:

```typescript
import { PriceDisplay } from '@react-shop/design-system';

<PriceDisplay
  price={29.99}
  originalPrice={39.99}
  currency="USD"
  size="md"
/>
```

#### Rating

Star rating display:

```typescript
import { Rating } from '@react-shop/design-system';

<Rating
  rating={4.5}
  maxRating={5}
  size="md"
  showValue={true}
  reviewCount={128}
/>
```

## Using PandaCSS Utilities

### CSS Function

```typescript
import { css } from '@react-shop/design-system';

<div className={css({
  bg: 'bg.surface',
  p: '4',
  borderRadius: 'lg',
  boxShadow: 'md',
  _hover: {
    bg: 'bg.muted',
  },
})}>
  Custom styled element
</div>
```

### Styled Function

```typescript
import { styled } from '@react-shop/design-system';

const CustomBox = styled('div', {
  base: {
    p: '4',
    borderRadius: 'md',
  },
  variants: {
    variant: {
      primary: { bg: 'brand.500', color: 'white' },
      secondary: { bg: 'neutral.200' },
    },
  },
});

<CustomBox variant="primary">Content</CustomBox>
```

### CVA (Class Variance Authority)

```typescript
import { cva } from '@react-shop/design-system';

const buttonStyles = cva({
  base: {
    px: '4',
    py: '2',
    borderRadius: 'md',
  },
  variants: {
    variant: {
      primary: { bg: 'brand.500', color: 'white' },
      secondary: { bg: 'neutral.200' },
    },
    size: {
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg' },
    },
  },
});
```

## Theming

### Light/Dark Mode

Set theme attribute on document:

```typescript
// Switch to dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Switch to light mode
document.documentElement.setAttribute('data-theme', 'light');
```

In React:

```typescript
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return <Button onClick={toggleTheme}>Toggle Theme</Button>;
}
```

### Custom Theme

Extend the base theme in your `panda.config.ts`:

```typescript
export default defineConfig({
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

## Best Practices

### 1. Use Semantic Tokens

```typescript
// Good - theme-aware
<Box bg="bg.surface" color="text.primary" />

// Avoid - hard-coded colors
<Box bg="white" color="black" />
```

### 2. Consistent Spacing

```typescript
// Use spacing scale
<Box p="4" m="2" gap="4" />

// Avoid arbitrary values
<Box p="15px" m="7px" />
```

### 3. Responsive Design

```typescript
<Box
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  p={{ base: '2', md: '4', lg: '6' }}
/>
```

### 4. Component Composition

```typescript
// Compose from primitives
const Card = ({ children }) => (
  <Box bg="bg.surface" p="4" borderRadius="lg" boxShadow="md">
    {children}
  </Box>
);
```

## TypeScript

All components are fully typed:

```typescript
import type { ButtonProps, CardProps } from '@react-shop/design-system';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Performance

PandaCSS generates static CSS at build time:
- Zero runtime overhead
- Minimal CSS output
- Automatic tree-shaking
- Optimal bundle size

## Next Steps

- [Services Package](./services_package.md) - API hooks
- [Adding Features](./adding_features.md) - Extend the design system

