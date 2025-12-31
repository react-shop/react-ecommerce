import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@lib/utils': path.resolve(__dirname, '../../packages/design-system/src/lib/utils.ts'),
      '@components': path.resolve(__dirname, '../../packages/design-system/src/components'),
    },
  },
});

