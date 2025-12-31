/**
 * API Route Constants
 * Centralized route definitions for all API endpoints
 */

export const AUTH_ROUTES = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  ME: '/api/users/me',
} as const;

export const PRODUCT_ROUTES = {
  LIST: '/api/products',
  DETAIL: (id: string) => `/api/products/${id}`,
  CREATE: '/api/products',
  UPDATE: (id: string) => `/api/products/${id}`,
  DELETE: (id: string) => `/api/products/${id}`,
} as const;

export const CATEGORY_ROUTES = {
  LIST: '/api/categories',
  DETAIL: (id: string) => `/api/categories/${id}`,
  CREATE: '/api/categories',
  UPDATE: (id: string) => `/api/categories/${id}`,
  DELETE: (id: string) => `/api/categories/${id}`,
} as const;

export const CART_ROUTES = {
  GET: '/api/cart',
  ADD_ITEM: '/api/cart/items',
  UPDATE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
  REMOVE_ITEM: (itemId: string) => `/api/cart/items/${itemId}`,
  CLEAR: '/api/cart/clear',
} as const;

export const ORDER_ROUTES = {
  LIST: '/api/orders',
  DETAIL: (id: string) => `/api/orders/${id}`,
  CREATE: '/api/orders',
  UPDATE_STATUS: (id: string) => `/api/orders/${id}/status`,
  CANCEL: (id: string) => `/api/orders/${id}/cancel`,
  ALL: '/api/orders/all',
} as const;

export const REVIEW_ROUTES = {
  LIST: (productId: string) => `/api/reviews/product/${productId}`,
  CREATE: '/api/reviews',
  UPDATE: (id: string) => `/api/reviews/${id}`,
  DELETE: (id: string) => `/api/reviews/${id}`,
  MODERATE: (id: string) => `/api/reviews/${id}/moderate`,
} as const;

