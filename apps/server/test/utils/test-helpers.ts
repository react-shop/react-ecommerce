import { PrismaService } from '../../src/prisma/prisma.service';

/**
 * Mock PrismaService for testing
 */
export const createMockPrismaService = (): Partial<PrismaService> => ({
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  } as any,
  product: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  } as any,
  category: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any,
  cart: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any,
  cartItem: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  } as any,
  order: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  } as any,
  review: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    aggregate: jest.fn(),
  } as any,
  tag: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any,
  discount: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  } as any,
  payment: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
  } as any,
  shipment: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  } as any,
  address: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as any,
  productVariant: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  } as any,
  productImage: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  } as any,
  productCategory: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  } as any,
  productTag: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  } as any,
  discountProduct: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    createMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  } as any,
});

/**
 * Mock user for testing
 */
export const createMockUser = (overrides = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'CUSTOMER',
  isActive: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock admin user for testing
 */
export const createMockAdminUser = (overrides = {}) => ({
  id: 'admin-123',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'ADMIN',
  isActive: true,
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock product for testing
 */
export const createMockProduct = (overrides = {}) => ({
  id: 'product-123',
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test product description',
  shortDesc: 'Test product',
  price: 100,
  sku: 'TEST-001',
  status: 'ACTIVE',
  stock: 10,
  trackInventory: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  images: [
    {
      id: 'img-1',
      url: 'https://example.com/image.jpg',
      isPrimary: true,
      sortOrder: 0,
    },
  ],
  categories: [],
  tags: [],
  variants: [],
  ...overrides,
});

/**
 * Mock category for testing
 */
export const createMockCategory = (overrides = {}) => ({
  id: 'category-123',
  name: 'Test Category',
  slug: 'test-category',
  description: 'Test category description',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock cart for testing
 */
export const createMockCart = (overrides = {}) => ({
  id: 'cart-123',
  userId: 'user-123',
  items: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock order for testing
 */
export const createMockOrder = (overrides = {}) => ({
  id: 'order-123',
  userId: 'user-123',
  orderNumber: 'ORD-2024-001',
  status: 'PENDING',
  subtotal: 100,
  discountAmount: 0,
  shippingCost: 10,
  tax: 8,
  total: 118,
  items: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock review for testing
 */
export const createMockReview = (overrides = {}) => ({
  id: 'review-123',
  userId: 'user-123',
  productId: 'product-123',
  rating: 5,
  title: 'Great product!',
  comment: 'This is an excellent product.',
  status: 'APPROVED',
  helpfulCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock discount for testing
 */
export const createMockDiscount = (overrides = {}) => ({
  id: 'discount-123',
  code: 'SAVE10',
  type: 'PERCENTAGE',
  value: 10,
  description: '10% off',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock payment for testing
 */
export const createMockPayment = (overrides = {}) => ({
  id: 'payment-123',
  orderId: 'order-123',
  userId: 'user-123',
  amount: 118,
  currency: 'USD',
  status: 'COMPLETED',
  method: 'CREDIT_CARD',
  paidAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock shipment for testing
 */
export const createMockShipment = (overrides = {}) => ({
  id: 'shipment-123',
  orderId: 'order-123',
  addressId: 'address-123',
  trackingNumber: 'TRK123456',
  carrier: 'FedEx',
  status: 'SHIPPED',
  shippedAt: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Mock address for testing
 */
export const createMockAddress = (overrides = {}) => ({
  id: 'address-123',
  userId: 'user-123',
  firstName: 'Test',
  lastName: 'User',
  street1: '123 Main St',
  city: 'Test City',
  state: 'TS',
  zipCode: '12345',
  country: 'US',
  phone: '555-1234',
  isDefault: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

/**
 * Wait for a specific amount of time (useful for async tests)
 */
export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate a unique ID for testing
 */
export const generateTestId = (prefix = 'test') => `${prefix}-${Date.now()}-${Math.random()}`;

