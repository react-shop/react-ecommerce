# PandaCSS Setup Guide

## Overview

This Design System uses [PandaCSS](https://panda-css.com) for zero-runtime, type-safe styling.

## How It Works

### 1. Configuration

`panda.config.ts` defines:

- Theme tokens (colors, spacing, fonts, etc.)
- Breakpoints
- Semantic tokens
- Output directory (`styled-system`)

### 2. Code Generation

When you run `pnpm prepare` or `panda codegen`, it:

- Scans all files in `src/**/*.{js,jsx,ts,tsx}`
- Generates type-safe style utilities in `styled-system/`
- Creates CSS at build time (zero runtime overhead)

### 3. Generated Files

```
styled-system/
├── css/           # Type-safe CSS function
├── jsx/           # Styled JSX factory
├── patterns/      # Layout patterns (flex, grid, etc.)
├── recipes/       # Component recipes (variants)
└── tokens/        # Design tokens
```

## Component Development

### Using CVA (Class Variance Authority)

```typescript
import { cva, type RecipeVariantProps } from "@styled-system/css";
import { styled } from "@styled-system/jsx";

// Define recipe with variants
const buttonRecipe = cva({
  base: {
    px: "4",
    py: "2",
    borderRadius: "md",
  },
  variants: {
    variant: {
      solid: { bg: "primary.default", color: "white" },
      outline: { border: "1px solid", borderColor: "primary.default" },
    },
    size: {
      sm: { px: "3", py: "1.5" },
      md: { px: "4", py: "2" },
      lg: { px: "6", py: "3" },
    },
  },
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
});

// Extract types
export type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;

// Create styled component
const StyledButton = styled("button", buttonRecipe);
```

### Import Paths

Always use the `@styled-system` alias:

```typescript
import { cva } from "@styled-system/css";
import { styled } from "@styled-system/jsx";
import { flex, grid } from "@styled-system/patterns";
```

**Never use relative paths:**

```typescript
// ❌ Wrong
import { styled } from "../../../styled-system/jsx";

// ✅ Correct
import { styled } from "@styled-system/jsx";
```

## Global Styles

Global CSS is defined in `src/styles/global.css`:

```css
@layer reset, base, tokens, recipes, utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body), system-ui, sans-serif;
}
```

### Using in Next.js

Import in your root layout:

```typescript
// apps/web/app/layout.tsx
import "@react-shop/design-system/src/styles/global.css";
```

## TypeScript Configuration

`tsconfig.json` must include:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@styled-system/*": ["./styled-system/*"]
    }
  },
  "include": ["src", "styled-system"]
}
```

## Development Workflow

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Generate Styled System

```bash
pnpm prepare
# or
panda codegen
```

This creates the `styled-system/` directory.

### 3. Start Storybook

```bash
pnpm storybook
```

### 4. Build Components

Components automatically get type-safe styling through PandaCSS.

## Troubleshooting

### "Cannot find module '@styled-system/css'"

**Solution:** Run `panda codegen` to generate the styled-system directory:

```bash
cd packages/design-system
pnpm prepare
```

### TypeScript Can't Find Styled System

**Solution:** Add `styled-system` to `tsconfig.json` include:

```json
{
  "include": ["src", "styled-system"]
}
```

### Styles Not Appearing

1. **Check if styled-system is generated:**

   ```bash
   ls styled-system/
   ```

2. **Regenerate if missing:**

   ```bash
   panda codegen
   ```

3. **Clear Next.js cache (if using in Next.js app):**
   ```bash
   rm -rf .next
   ```

### Import Errors After Atomic Design Refactor

**Problem:** Old relative paths don't work with new structure.

**Solution:** Use absolute imports with `@styled-system` alias:

```typescript
// ❌ Old (broken after refactor)
import { styled } from "../../../styled-system/jsx";

// ✅ New (works from any location)
import { styled } from "@styled-system/jsx";
```

## Best Practices

### 1. Use Semantic Tokens

```typescript
// ✅ Good - adapts to theme
bg: "bg.surface";
color: "text.primary";

// ❌ Avoid - hardcoded values
bg: "white";
color: "#000000";
```

### 2. Define Recipes for Variants

```typescript
const cardRecipe = cva({
  base: { ... },
  variants: {
    variant: {
      elevated: { boxShadow: 'lg' },
      outline: { border: '1px solid' },
    }
  }
});
```

### 3. Use Pattern Functions

```typescript
import { flex, grid, stack } from '@styled-system/patterns';

<div className={flex({ gap: '4', direction: 'column' })}>
  ...
</div>
```

### 4. Responsive Design

```typescript
const recipe = cva({
  base: {
    fontSize: { base: "sm", md: "md", lg: "lg" },
    padding: { base: "2", md: "4", lg: "6" },
  },
});
```

## Resources

- [PandaCSS Documentation](https://panda-css.com)
- [Next.js Integration](https://panda-css.com/docs/installation/nextjs)
- [CVA Documentation](https://panda-css.com/docs/concepts/recipes#cva)
- [Patterns](https://panda-css.com/docs/concepts/patterns)
