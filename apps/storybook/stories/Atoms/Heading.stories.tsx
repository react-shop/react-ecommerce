import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '@react-shop/design-system';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    as: 'h1',
    size: '4xl',
    children: 'Heading Level 1',
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    size: '3xl',
    children: 'Heading Level 2',
  },
};

export const H3: Story = {
  args: {
    as: 'h3',
    size: '2xl',
    children: 'Heading Level 3',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading as="h1" size="4xl">Extra Large Heading (4xl)</Heading>
      <Heading as="h2" size="3xl">Large Heading (3xl)</Heading>
      <Heading as="h3" size="2xl">Medium-Large Heading (2xl)</Heading>
      <Heading as="h4" size="xl">Medium Heading (xl)</Heading>
      <Heading as="h5" size="lg">Small-Medium Heading (lg)</Heading>
      <Heading as="h6" size="md">Small Heading (md)</Heading>
    </div>
  ),
};

