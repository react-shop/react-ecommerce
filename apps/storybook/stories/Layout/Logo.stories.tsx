import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '@react-shop/design-system';

const meta = {
  title: 'Layout/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Small</p>
        <Logo size="sm" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Medium (Default)</p>
        <Logo size="md" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Large</p>
        <Logo size="lg" />
      </div>
    </div>
  ),
};

