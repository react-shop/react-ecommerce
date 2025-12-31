import { Address } from './User';
import { Product, ProductVariant } from './Product';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discountAmount: number;
  total: number;
  shippingAddressId: string;
  billingAddressId: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  price: number;
  createdAt: Date;
  product?: Product;
  variant?: ProductVariant | null;
}

export interface CreateOrderInput {
  shippingAddressId: string;
  billingAddressId: string;
  notes?: string;
  discountCode?: string | null;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

