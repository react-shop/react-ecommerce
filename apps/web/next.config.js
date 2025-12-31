const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-shop/design-system', '@react-shop/sdk'],
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@react-shop/design-system'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lib': path.resolve(__dirname, '../../packages/design-system/src/lib'),
      '@entities': path.resolve(__dirname, '../../packages/sdk/src/entities'),
      '@providers': path.resolve(__dirname, '../../packages/sdk/src/providers'),
      '@services': path.resolve(__dirname, '../../packages/sdk/src/services'),
    };
    return config;
  },
};

module.exports = nextConfig;
