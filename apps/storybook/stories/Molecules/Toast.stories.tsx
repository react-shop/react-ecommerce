import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@react-shop/design-system';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    message: 'Your changes have been saved successfully.',
    onClose: () => console.log('Toast closed'),
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'Something went wrong. Please try again.',
    onClose: () => console.log('Toast closed'),
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please review your information before continuing.',
    onClose: () => console.log('Toast closed'),
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Info',
    message: 'Your session will expire in 5 minutes.',
    onClose: () => console.log('Toast closed'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        variant="success"
        title="Success"
        message="Operation completed successfully"
        onClose={() => {}}
      />
      <Toast
        variant="error"
        title="Error"
        message="An error occurred"
        onClose={() => {}}
      />
      <Toast
        variant="warning"
        title="Warning"
        message="Please be careful"
        onClose={() => {}}
      />
      <Toast
        variant="info"
        title="Information"
        message="Here's some useful info"
        onClose={() => {}}
      />
    </div>
  ),
};

