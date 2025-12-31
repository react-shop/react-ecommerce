import type { Meta, StoryObj } from '@storybook/react';
import { MobileMenu } from '@react-shop/design-system';
import { useState } from 'react';

const meta = {
  title: 'Layout/MobileMenu',
  component: MobileMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockLinks = [
  { label: 'Home', href: '/', isActive: true },
  { label: 'Products', href: '/products', isActive: false },
  { label: 'Categories', href: '/categories', isActive: false },
  { label: 'About', href: '/about', isActive: false },
];

const MockLink = ({ href, children, className, onClick }: any) => (
  <a href={href} className={className} onClick={(e) => { e.preventDefault(); onClick?.(); }}>
    {children}
  </a>
);

export const LoggedOut: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-primary-600 text-white rounded-md">
          Open Menu
        </button>
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={null}
          links={mockLinks}
          onLogin={() => console.log('Login')}
          onLogout={() => console.log('Logout')}
          LinkComponent={MockLink}
        />
      </>
    );
  },
};

export const LoggedIn: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-primary-600 text-white rounded-md">
          Open Menu
        </button>
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          user={{
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
          }}
          links={mockLinks}
          onLogin={() => console.log('Login')}
          onLogout={() => console.log('Logout')}
          LinkComponent={MockLink}
        />
      </>
    );
  },
};

