import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Shipment, ShipmentStatus, OrderStatus } from '@prisma/client';

@Injectable()
export class ShipmentService {
  constructor(private prisma: PrismaService) {}

  async create(
    orderId: string,
    addressId: string,
    carrier: string,
    trackingNumber?: string,
    estimatedDeliveryDate?: Date,
  ): Promise<Shipment> {
    // Verify order exists
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    // Verify address belongs to the order's user
    const address = await this.prisma.address.findFirst({
      where: {
        id: addressId,
        userId: order.userId,
      },
    });

    if (!address) {
      throw new HttpException('Address not found or does not belong to order owner', HttpStatus.NOT_FOUND);
    }

    return this.prisma.shipment.create({
      data: {
        orderId,
        addressId,
        carrier,
        trackingNumber,
        estimatedDeliveryDate,
        status: ShipmentStatus.PENDING,
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
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        address: true,
      },
    });
  }

  async findAll(userId?: string, skip = 0, take = 10): Promise<Shipment[]> {
    const where = userId ? { order: { userId } } : {};

    return this.prisma.shipment.findMany({
      where,
      skip,
      take,
      include: {
        order: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId?: string): Promise<Shipment | null> {
    const where: any = { id };

    if (userId) {
      where.order = { userId };
    }

    return this.prisma.shipment.findFirst({
      where,
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
            user: {
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        address: true,
      },
    });
  }

  async findByOrder(orderId: string, userId?: string): Promise<Shipment[]> {
    const where: any = { orderId };

    if (userId) {
      where.order = { userId };
    }

    return this.prisma.shipment.findMany({
      where,
      include: {
        address: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByTrackingNumber(trackingNumber: string): Promise<Shipment | null> {
    return this.prisma.shipment.findUnique({
      where: { trackingNumber },
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
        address: true,
      },
    });
  }

  async updateStatus(
    id: string,
    status: ShipmentStatus,
    notes?: string,
  ): Promise<Shipment> {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!shipment) {
      throw new HttpException('Shipment not found', HttpStatus.NOT_FOUND);
    }

    const updateData: any = {
      status,
      ...(notes && { notes }),
    };

    // Set shipped date if status is shipped
    if (status === ShipmentStatus.SHIPPED && !shipment.shippedAt) {
      updateData.shippedAt = new Date();

      // Update order status
      await this.prisma.order.update({
        where: { id: shipment.orderId },
        data: { status: OrderStatus.SHIPPED },
      });
    }

    // Set delivered date if status is delivered
    if (status === ShipmentStatus.DELIVERED && !shipment.deliveredAt) {
      updateData.deliveredAt = new Date();

      // Update order status
      await this.prisma.order.update({
        where: { id: shipment.orderId },
        data: { status: OrderStatus.DELIVERED },
      });
    }

    return this.prisma.shipment.update({
      where: { id },
      data: updateData,
      include: {
        order: true,
        address: true,
      },
    });
  }

  async update(
    id: string,
    data: {
      carrier?: string;
      trackingNumber?: string;
      estimatedDeliveryDate?: Date;
      notes?: string;
    },
  ): Promise<Shipment> {
    const shipment = await this.prisma.shipment.findUnique({ where: { id } });

    if (!shipment) {
      throw new HttpException('Shipment not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.shipment.update({
      where: { id },
      data,
      include: {
        order: true,
        address: true,
      },
    });
  }

  async cancel(id: string, reason?: string): Promise<Shipment> {
    const shipment = await this.prisma.shipment.findUnique({ where: { id } });

    if (!shipment) {
      throw new HttpException('Shipment not found', HttpStatus.NOT_FOUND);
    }

    if (shipment.status === ShipmentStatus.DELIVERED) {
      throw new BadRequestException('Cannot cancel a delivered shipment');
    }

    return this.prisma.shipment.update({
      where: { id },
      data: {
        status: ShipmentStatus.CANCELLED,
        ...(reason && { notes: `${shipment.notes || ''}\nCancellation reason: ${reason}` }),
      },
      include: {
        order: true,
        address: true,
      },
    });
  }

  async getStats(userId?: string): Promise<{
    total: number;
    pending: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  }> {
    const where = userId ? { order: { userId } } : {};

    const [total, pending, shipped, delivered, cancelled] = await Promise.all([
      this.prisma.shipment.count({ where }),
      this.prisma.shipment.count({ where: { ...where, status: ShipmentStatus.PENDING } }),
      this.prisma.shipment.count({ where: { ...where, status: ShipmentStatus.SHIPPED } }),
      this.prisma.shipment.count({ where: { ...where, status: ShipmentStatus.DELIVERED } }),
      this.prisma.shipment.count({ where: { ...where, status: ShipmentStatus.CANCELLED } }),
    ]);

    return {
      total,
      pending,
      shipped,
      delivered,
      cancelled,
    };
  }
}

