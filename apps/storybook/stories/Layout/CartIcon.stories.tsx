import type { Meta, StoryObj } from '@storybook/react';
import { CartIcon } from '@react-shop/design-system';

const meta = {
  title: 'Layout/CartIcon',
  component: CartIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof CartIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    itemCount: 0,
    onClick: () => console.log('Cart clicked'),
  },
};

export const WithItems: Story = {
  args: {
    itemCount: 3,
    onClick: () => console.log('Cart clicked'),
  },
};

export const ManyItems: Story = {
  args: {
    itemCount: 99,
    onClick: () => console.log('Cart clicked'),
  },
};

export const OverLimit: Story = {
  args: {
    itemCount: 999,
    onClick: () => console.log('Cart clicked'),
  },
};

