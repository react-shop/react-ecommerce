import type { Config } from 'tailwindcss';
import designSystemConfig from '@react-shop/design-system/tailwind.config';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [designSystemConfig],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

