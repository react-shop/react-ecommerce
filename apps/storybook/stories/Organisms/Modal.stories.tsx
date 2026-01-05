import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '@react-shop/design-system';
import { useState } from 'react';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Open Modal
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal Title"
        >
          <p>This is the modal content. You can add any content here.</p>
        </Modal>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Open Modal with Actions
        </button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          footer={
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Confirmed');
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Confirm
              </button>
            </div>
          }
        >
          <p>Are you sure you want to proceed with this action?</p>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    return (
      <>
        <div className="flex gap-3">
          <button onClick={() => setSize('sm')} className="px-4 py-2 bg-primary-600 text-white rounded-md">Small</button>
          <button onClick={() => setSize('md')} className="px-4 py-2 bg-primary-600 text-white rounded-md">Medium</button>
          <button onClick={() => setSize('lg')} className="px-4 py-2 bg-primary-600 text-white rounded-md">Large</button>
          <button onClick={() => setSize('xl')} className="px-4 py-2 bg-primary-600 text-white rounded-md">Extra Large</button>
        </div>
        {size && (
          <Modal
            isOpen={true}
            onClose={() => setSize(null)}
            title={`${size.toUpperCase()} Modal`}
            size={size}
          >
            <p>This is a {size} sized modal.</p>
          </Modal>
        )}
      </>
    );
  },
};

