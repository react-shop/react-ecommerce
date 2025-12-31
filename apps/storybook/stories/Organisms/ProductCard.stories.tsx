import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '@react-shop/design-system';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    title: 'Premium Wireless Headphones',
    price: 299.99,
    currency: '$',
    rating: 4.5,
    onAddToCart: () => console.log('Add to cart clicked'),
  },
};

export const WithDiscount: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    title: 'Classic Watch',
    price: 149.99,
    comparePrice: 199.99,
    discount: 25,
    currency: '$',
    rating: 4.8,
    badge: 'Sale',
    onAddToCart: () => console.log('Add to cart clicked'),
  },
};

export const OutOfStock: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    title: 'Designer Sunglasses',
    price: 199.99,
    currency: '$',
    rating: 4.2,
    badge: 'Out of Stock',
    onAddToCart: () => console.log('Add to cart clicked'),
  },
};

export const NewProduct: Story = {
  args: {
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    title: 'Running Shoes',
    price: 129.99,
    currency: '$',
    rating: 5,
    badge: 'New',
    onAddToCart: () => console.log('Add to cart clicked'),
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
        title="Premium Headphones"
        price={299.99}
        currency="$"
        rating={4.5}
        onAddToCart={() => {}}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
        title="Classic Watch"
        price={149.99}
        comparePrice={199.99}
        discount={25}
        currency="$"
        rating={4.8}
        badge="Sale"
        onAddToCart={() => {}}
      />
      <ProductCard
        image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
        title="Designer Sunglasses"
        price={199.99}
        currency="$"
        rating={4.2}
        onAddToCart={() => {}}
      />
    </div>
  ),
};

