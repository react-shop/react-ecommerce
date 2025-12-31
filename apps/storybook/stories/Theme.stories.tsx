import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Theme',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className="w-24 h-24 rounded-lg shadow-md border border-gray-200"
      style={{ backgroundColor: value }}
    />
    <div className="text-center">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{value}</p>
    </div>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-6">
          <ColorSwatch name="brand-50" value="#f0f9ff" />
          <ColorSwatch name="brand-100" value="#e0f2fe" />
          <ColorSwatch name="brand-200" value="#bae6fd" />
          <ColorSwatch name="brand-300" value="#7dd3fc" />
          <ColorSwatch name="brand-400" value="#38bdf8" />
          <ColorSwatch name="brand-500" value="#0ea5e9" />
          <ColorSwatch name="brand-600" value="#0284c7" />
          <ColorSwatch name="brand-700" value="#0369a1" />
          <ColorSwatch name="brand-800" value="#075985" />
          <ColorSwatch name="brand-900" value="#0c4a6e" />
          <ColorSwatch name="brand-950" value="#082f49" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Primary Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
          <ColorSwatch name="primary-50" value="#f0f9ff" />
          <ColorSwatch name="primary-100" value="#e0f2fe" />
          <ColorSwatch name="primary-200" value="#bae6fd" />
          <ColorSwatch name="primary-300" value="#7dd3fc" />
          <ColorSwatch name="primary-400" value="#38bdf8" />
          <ColorSwatch name="primary-500" value="#0ea5e9" />
          <ColorSwatch name="primary-600" value="#0284c7" />
          <ColorSwatch name="primary-700" value="#0369a1" />
          <ColorSwatch name="primary-800" value="#075985" />
          <ColorSwatch name="primary-900" value="#0c4a6e" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Success Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
          <ColorSwatch name="success-50" value="#f0fdf4" />
          <ColorSwatch name="success-100" value="#dcfce7" />
          <ColorSwatch name="success-200" value="#bbf7d0" />
          <ColorSwatch name="success-300" value="#86efac" />
          <ColorSwatch name="success-400" value="#4ade80" />
          <ColorSwatch name="success-500" value="#22c55e" />
          <ColorSwatch name="success-600" value="#16a34a" />
          <ColorSwatch name="success-700" value="#15803d" />
          <ColorSwatch name="success-800" value="#166534" />
          <ColorSwatch name="success-900" value="#14532d" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Error Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
          <ColorSwatch name="error-50" value="#fef2f2" />
          <ColorSwatch name="error-100" value="#fee2e2" />
          <ColorSwatch name="error-200" value="#fecaca" />
          <ColorSwatch name="error-300" value="#fca5a5" />
          <ColorSwatch name="error-400" value="#f87171" />
          <ColorSwatch name="error-500" value="#ef4444" />
          <ColorSwatch name="error-600" value="#dc2626" />
          <ColorSwatch name="error-700" value="#b91c1c" />
          <ColorSwatch name="error-800" value="#991b1b" />
          <ColorSwatch name="error-900" value="#7f1d1d" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Warning Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-6">
          <ColorSwatch name="warning-50" value="#fffbeb" />
          <ColorSwatch name="warning-100" value="#fef3c7" />
          <ColorSwatch name="warning-200" value="#fde68a" />
          <ColorSwatch name="warning-300" value="#fcd34d" />
          <ColorSwatch name="warning-400" value="#fbbf24" />
          <ColorSwatch name="warning-500" value="#f59e0b" />
          <ColorSwatch name="warning-600" value="#d97706" />
          <ColorSwatch name="warning-700" value="#b45309" />
          <ColorSwatch name="warning-800" value="#92400e" />
          <ColorSwatch name="warning-900" value="#78350f" />
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Font Sizes</h2>
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">2xs</span>
            <span className="text-2xs">The quick brown fox jumps over the lazy dog (0.625rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">xs</span>
            <span className="text-xs">The quick brown fox jumps over the lazy dog (0.75rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">sm</span>
            <span className="text-sm">The quick brown fox jumps over the lazy dog (0.875rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">base</span>
            <span className="text-base">The quick brown fox jumps over the lazy dog (1rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">lg</span>
            <span className="text-lg">The quick brown fox jumps over the lazy dog (1.125rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">xl</span>
            <span className="text-xl">The quick brown fox jumps over the lazy dog (1.25rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">2xl</span>
            <span className="text-2xl">The quick brown fox jumps over the lazy dog (1.5rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">3xl</span>
            <span className="text-3xl">The quick brown fox jumps (1.875rem)</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="text-xs w-20 text-gray-500">4xl</span>
            <span className="text-4xl">The quick brown (2.25rem)</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Font Weights</h2>
        <div className="space-y-2">
          <p className="font-light">Font Light (300) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-normal">Font Normal (400) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-medium">Font Medium (500) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-semibold">Font Semibold (600) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-bold">Font Bold (700) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Spacing Scale</h2>
        <div className="space-y-4">
          {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64].map((space) => (
            <div key={space} className="flex items-center gap-4">
              <span className="text-sm w-12 text-gray-500">{space}</span>
              <div className="bg-primary-500 h-4" style={{ width: `${space * 4}px` }} />
              <span className="text-xs text-gray-500">{space * 4}px / {space * 0.25}rem</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Border Radius</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-none" />
          <span className="text-sm">none (0px)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-sm" />
          <span className="text-sm">sm (0.125rem)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded" />
          <span className="text-sm">base (0.25rem)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-md" />
          <span className="text-sm">md (0.375rem)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-lg" />
          <span className="text-sm">lg (0.5rem)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-xl" />
          <span className="text-sm">xl (0.75rem)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-2xl" />
          <span className="text-sm">2xl (1rem)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-primary-500 rounded-full" />
          <span className="text-sm">full (9999px)</span>
        </div>
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Shadows</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg shadow-sm flex items-center justify-center">
            <span className="text-sm font-medium">sm</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg shadow flex items-center justify-center">
            <span className="text-sm font-medium">base</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center">
            <span className="text-sm font-medium">md</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-sm font-medium">lg</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg shadow-xl flex items-center justify-center">
            <span className="text-sm font-medium">xl</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-32 h-32 bg-white rounded-lg shadow-2xl flex items-center justify-center">
            <span className="text-sm font-medium">2xl</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

