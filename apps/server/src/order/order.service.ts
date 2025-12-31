import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
  ) {}

  async createOrder(
    userId: string,
    shippingAddressId: string,
    billingAddressId: string,
    paymentMethod: string,
  ) {
    // Get user's cart
    const cart = await this.cartService.getCart(userId);

    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Verify addresses exist
    const shippingAddress = await this.prisma.address.findFirst({
      where: { id: shippingAddressId, userId },
    });

    const billingAddress = await this.prisma.address.findFirst({
      where: { id: billingAddressId, userId },
    });

    if (!shippingAddress || !billingAddress) {
      throw new NotFoundException('Address not found');
    }

    // Calculate totals
    const subtotal = cart.subtotal;
    const shippingCost = 0; // TODO: Calculate based on shipping method
    const tax = subtotal * 0.1; // TODO: Calculate based on location
    const total = subtotal + shippingCost + tax;

    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        userId,
        status: OrderStatus.PENDING,
        subtotal,
        shippingCost,
        tax,
        total,
        shippingAddressId,
        billingAddressId,
        paymentMethod,
        items: {
          create: cart.items.map((item: any) => ({
            productId: item.product.id,
            variantId: item.variant?.id,
            quantity: item.quantity,
            price: item.variant?.price || item.product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    // Clear cart after order creation
    await this.cartService.clearCart(userId);

    return order;
  }

  async getOrders(userId: string, skip = 0, take = 10) {
    return this.prisma.order.findMany({
      where: { userId },
      skip,
      take,
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        ...(status === OrderStatus.SHIPPED && { shippedAt: new Date() }),
        ...(status === OrderStatus.DELIVERED && { deliveredAt: new Date() }),
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.PROCESSING) {
      throw new BadRequestException('Order cannot be cancelled');
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.CANCELLED },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
      },
    });
  }

  // Admin methods
  async getAllOrders(skip = 0, take = 10, status?: OrderStatus) {
    return this.prisma.order.findMany({
      where: status ? { status } : {},
      skip,
      take,
      include: {
        user: true,
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        shippingAddress: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

