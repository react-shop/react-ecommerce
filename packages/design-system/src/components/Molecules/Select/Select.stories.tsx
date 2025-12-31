import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select>
      <option>Select an option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Select size="sm">
        <option>Small select</option>
        <option>Option 1</option>
      </Select>
      <Select size="md">
        <option>Medium select</option>
        <option>Option 1</option>
      </Select>
      <Select size="lg">
        <option>Large select</option>
        <option>Option 1</option>
      </Select>
    </div>
  ),
};

