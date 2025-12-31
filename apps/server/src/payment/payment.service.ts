import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment, PaymentStatus, PaymentMethod } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(
    orderId: string,
    userId: string,
    amount: number,
    currency: string,
    method: PaymentMethod,
    transactionId?: string,
    cardLast4?: string,
    cardBrand?: string,
  ): Promise<Payment> {
    // Verify order exists and belongs to user
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Verify amount matches order total
    if (Math.abs(amount - order.total) > 0.01) {
      throw new BadRequestException('Payment amount does not match order total');
    }

    return this.prisma.payment.create({
      data: {
        orderId,
        userId,
        amount,
        currency,
        status: PaymentStatus.PENDING,
        method,
        transactionId,
        cardLast4,
        cardBrand,
      },
      include: {
        order: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  async findAll(userId?: string, skip = 0, take = 10): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: userId ? { userId } : {},
      skip,
      take,
      include: {
        order: {
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
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId?: string): Promise<Payment | null> {
    return this.prisma.payment.findFirst({
      where: {
        id,
        ...(userId && { userId }),
      },
      include: {
        order: {
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
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findByOrder(orderId: string, userId?: string): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        orderId,
        ...(userId && { userId }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    id: string,
    status: PaymentStatus,
    failureReason?: string,
  ): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({ where: { id } });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    const updateData: any = {
      status,
      ...(failureReason && { failureReason }),
    };

    // Set paid date if payment is completed
    if (status === PaymentStatus.COMPLETED && !payment.paidAt) {
      updateData.paidAt = new Date();
    }

    // Update order status if payment is completed
    if (status === PaymentStatus.COMPLETED) {
      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: { status: 'PROCESSING' },
      });
    }

    return this.prisma.payment.update({
      where: { id },
      data: updateData,
      include: {
        order: true,
      },
    });
  }

  async refund(
    id: string,
    amount?: number,
    reason?: string,
  ): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({ where: { id } });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    const refundAmount = amount || payment.amount;

    if (refundAmount > payment.amount) {
      throw new BadRequestException('Refund amount cannot exceed payment amount');
    }

    return this.prisma.payment.update({
      where: { id },
      data: {
        status: PaymentStatus.REFUNDED,
        refundedAt: new Date(),
        refundAmount,
        ...(reason && { failureReason: reason }),
      },
      include: {
        order: true,
      },
    });
  }

  async getStats(userId?: string): Promise<{
    total: number;
    completed: number;
    pending: number;
    failed: number;
    refunded: number;
    totalAmount: number;
  }> {
    const where = userId ? { userId } : {};

    const [total, completed, pending, failed, refunded, totalAmountResult] = await Promise.all([
      this.prisma.payment.count({ where }),
      this.prisma.payment.count({ where: { ...where, status: PaymentStatus.COMPLETED } }),
      this.prisma.payment.count({ where: { ...where, status: PaymentStatus.PENDING } }),
      this.prisma.payment.count({ where: { ...where, status: PaymentStatus.FAILED } }),
      this.prisma.payment.count({ where: { ...where, status: PaymentStatus.REFUNDED } }),
      this.prisma.payment.aggregate({
        where: { ...where, status: PaymentStatus.COMPLETED },
        _sum: { amount: true },
      }),
    ]);

    return {
      total,
      completed,
      pending,
      failed,
      refunded,
      totalAmount: totalAmountResult._sum.amount || 0,
    };
  }
}

