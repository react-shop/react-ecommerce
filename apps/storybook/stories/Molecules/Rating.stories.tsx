import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '@react-shop/design-system';
import { useState } from 'react';

const meta = {
  title: 'Molecules/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    readonly: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 3.5,
    readonly: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [rating, setRating] = useState(0);
    return (
      <div>
        <Rating value={rating} onChange={setRating} />
        <p className="mt-2 text-sm">Selected rating: {rating}</p>
      </div>
    );
  },
};

export const Readonly: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Rating value={5} readonly />
        <p className="text-sm mt-1">Perfect (5.0)</p>
      </div>
      <div>
        <Rating value={4} readonly />
        <p className="text-sm mt-1">Great (4.0)</p>
      </div>
      <div>
        <Rating value={3.5} readonly />
        <p className="text-sm mt-1">Good (3.5)</p>
      </div>
      <div>
        <Rating value={2} readonly />
        <p className="text-sm mt-1">Fair (2.0)</p>
      </div>
      <div>
        <Rating value={1} readonly />
        <p className="text-sm mt-1">Poor (1.0)</p>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={3.5} size="sm" readonly />
      <Rating value={3.5} size="md" readonly />
      <Rating value={3.5} size="lg" readonly />
    </div>
  ),
};

