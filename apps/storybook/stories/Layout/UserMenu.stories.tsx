import type { Meta, StoryObj } from '@storybook/react';
import { UserMenu } from '@react-shop/design-system';

const meta = {
  title: 'Layout/UserMenu',
  component: UserMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  args: {
    user: null,
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
};

export const WithShortName: Story = {
  args: {
    user: {
      firstName: 'Jo',
      lastName: 'Do',
      email: 'jo@example.com',
    },
    onLogin: () => console.log('Login clicked'),
    onLogout: () => console.log('Logout clicked'),
  },
};

