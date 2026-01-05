# Storybook - Design System Documentation

This is the Storybook documentation app for `@react-shop/design-system`.

## Getting Started

```bash
# Install dependencies (from root)
pnpm install

# Start Storybook
cd apps/storybook
pnpm dev
```

Storybook will be available at `http://localhost:6006`

## Building

```bash
pnpm build
```

## Writing Stories

Create stories in the `stories/` directory:

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@react-shop/design-system';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
  },
};
```

## Structure

```
stories/
├── Atoms/          → Basic components (Button, Text, Input)
├── Molecules/      → Composite components (Card, Rating)
├── Organisms/      → Complex components (Modal, ProductCard)
└── Layout/         → Layout components (Header, Footer)
```

