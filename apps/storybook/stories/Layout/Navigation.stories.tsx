import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@react-shop/design-system';

const meta = {
  title: 'Layout/Navigation',
  component: Navigation,
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockLinks = [
  { label: 'Home', href: '/', isActive: true },
  { label: 'Products', href: '/products', isActive: false },
  { label: 'Categories', href: '/categories', isActive: false },
  { label: 'About', href: '/about', isActive: false },
];

const MockLink = ({ href, children, className }: any) => (
  <a href={href} className={className} onClick={(e) => e.preventDefault()}>
    {children}
  </a>
);

export const Default: Story = {
  args: {
    links: mockLinks,
    LinkComponent: MockLink,
  },
};

export const WithActiveLink: Story = {
  args: {
    links: [
      { label: 'Home', href: '/', isActive: false },
      { label: 'Products', href: '/products', isActive: true },
      { label: 'Categories', href: '/categories', isActive: false },
    ],
    LinkComponent: MockLink,
  },
};

