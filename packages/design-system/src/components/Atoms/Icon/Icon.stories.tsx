import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { Heart, ShoppingCart, User, Star, Search } from 'lucide-react';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Heart,
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon icon={Star} size="xs" />
      <Icon icon={Star} size="sm" />
      <Icon icon={Star} size="md" />
      <Icon icon={Star} size="lg" />
      <Icon icon={Star} size="xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Icon icon={Heart} color="red" />
      <Icon icon={ShoppingCart} color="blue" />
      <Icon icon={User} color="green" />
      <Icon icon={Search} color="purple" />
    </div>
  ),
};

