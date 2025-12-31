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
    discountCode?: string,
    customerNote?: string,
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
    const shippingCost = 10; // TODO: Calculate based on shipping method
    const tax = subtotal * 0.08; // TODO: Calculate based on location

    // Apply discount if provided
    let discountAmount = 0;
    let discountId: string | null = null;

    if (discountCode) {
      const discount = await this.prisma.discount.findUnique({
        where: { code: discountCode },
      });

      if (discount && discount.isActive && (!discount.expiresAt || discount.expiresAt > new Date())) {
        discountId = discount.id;

        // Check if max uses reached
        if (discount.maxUses) {
          const usageCount = await this.prisma.order.count({
            where: { discountId: discount.id },
          });

          if (usageCount >= discount.maxUses) {
            throw new BadRequestException('Discount code has reached maximum usage');
          }
        }

        // Calculate discount
        if (discount.type === 'PERCENTAGE') {
          discountAmount = (subtotal * discount.value) / 100;
        } else if (discount.type === 'FIXED_AMOUNT') {
          discountAmount = discount.value;
        }
      }
    }

    const total = subtotal - discountAmount + shippingCost + tax;

    // Generate order number
    const orderNumber = await this.generateOrderNumber();

    // Create order with items
    const order = await this.prisma.order.create({
      data: {
        userId,
        orderNumber,
        status: OrderStatus.PENDING,
        subtotal,
        discountAmount,
        shippingCost,
        tax,
        total,
        shippingAddressId,
        billingAddressId,
        discountId,
        customerNote,
        items: {
          create: cart.items.map((item: any) => {
            const price = item.variant?.price || item.product.price;
            return {
              productId: item.product.id,
              variantId: item.variant?.id,
              quantity: item.quantity,
              price,
              total: price * item.quantity,
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
        discount: true,
      },
    });

    // Clear cart after order creation
    await this.cartService.clearCart(userId);

    return order;
  }

  private async generateOrderNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    // Get count of orders this month
    const monthStart = new Date(year, now.getMonth(), 1);
    const monthEnd = new Date(year, now.getMonth() + 1, 0);

    const count = await this.prisma.order.count({
      where: {
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
    });

    const orderNum = String(count + 1).padStart(4, '0');
    return `ORD-${year}${month}-${orderNum}`;
  }

  async getOrders(userId: string, skip = 0, take = 10) {
    return this.prisma.order.findMany({
      where: { userId },
      skip,
      take,
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        discount: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        shipments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
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
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
        discount: true,
        payments: {
          orderBy: { createdAt: 'desc' },
        },
        shipments: {
          include: {
            address: true,
          },
          orderBy: { createdAt: 'desc' },
        },
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
      data: { status },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
        discount: true,
        payments: true,
        shipments: true,
      },
    });
  }

  async cancelOrder(userId: string, orderId: string, reason?: string) {
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
      data: {
        status: OrderStatus.CANCELLED,
        ...(reason && { customerNote: `${order.customerNote || ''}\nCancellation reason: ${reason}` }),
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        billingAddress: true,
        discount: true,
        payments: true,
        shipments: true,
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
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
            variant: true,
          },
        },
        shippingAddress: true,
        discount: true,
        payments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        shipments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

