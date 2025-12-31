import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '@react-shop/design-system';
import { useState } from 'react';

const meta = {
  title: 'Layout/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div className="w-full max-w-md">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => console.log('Search:', query)}
          placeholder="Search products..."
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [query, setQuery] = useState('wireless headphones');
    return (
      <div className="w-full max-w-md">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => console.log('Search:', query)}
          placeholder="Search products..."
        />
      </div>
    );
  },
};

