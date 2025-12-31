import type { Meta, StoryObj } from '@storybook/react';
import { PriceDisplay } from '@react-shop/design-system';

const meta = {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    price: 99.99,
    currency: '$',
  },
};

export const WithComparePrice: Story = {
  args: {
    price: 79.99,
    comparePrice: 99.99,
    currency: '$',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <PriceDisplay price={99.99} currency="$" size="sm" />
      <PriceDisplay price={99.99} currency="$" size="md" />
      <PriceDisplay price={99.99} currency="$" size="lg" />
    </div>
  ),
};

export const WithDiscount: Story = {
  render: () => (
    <div className="space-y-4">
      <PriceDisplay price={49.99} comparePrice={99.99} currency="$" size="lg" />
      <PriceDisplay price={79.99} comparePrice={129.99} currency="$" size="lg" />
    </div>
  ),
};

