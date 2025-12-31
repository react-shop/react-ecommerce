import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@react-shop/design-system';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User Avatar',
  },
};

export const WithFallback: Story = {
  args: {
    src: undefined,
    fallback: 'JD',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar src="https://i.pravatar.cc/150?img=2" alt="Small" size="sm" />
      <Avatar src="https://i.pravatar.cc/150?img=3" alt="Medium" size="md" />
      <Avatar src="https://i.pravatar.cc/150?img=4" alt="Large" size="lg" />
      <Avatar src="https://i.pravatar.cc/150?img=5" alt="Extra Large" size="xl" />
    </div>
  ),
};

export const Fallbacks: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar fallback="AB" size="md" />
      <Avatar fallback="CD" size="md" />
      <Avatar fallback="EF" size="md" />
    </div>
  ),
};

