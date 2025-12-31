import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Discount, DiscountType } from '@prisma/client';

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}

  async create(
    code: string,
    type: DiscountType,
    value: number,
    description?: string,
    minOrderValue?: number,
    maxDiscount?: number,
    maxUses?: number,
    expiresAt?: Date,
    productIds?: string[],
  ): Promise<Discount> {
    // Validate code format
    const codeRegex = /^[A-Z0-9_-]{3,20}$/;
    if (!codeRegex.test(code)) {
      throw new BadRequestException('Invalid discount code format. Use uppercase letters, numbers, dashes, and underscores (3-20 chars)');
    }

    const existingDiscount = await this.prisma.discount.findUnique({ where: { code } });
    if (existingDiscount) {
      throw new HttpException('Discount code already exists', HttpStatus.CONFLICT);
    }

    // Validate value based on type
    if (type === DiscountType.PERCENTAGE && (value < 0 || value > 100)) {
      throw new BadRequestException('Percentage discount must be between 0 and 100');
    }

    if (type === DiscountType.FIXED && value < 0) {
      throw new BadRequestException('Fixed discount must be positive');
    }

    return this.prisma.discount.create({
      data: {
        code,
        type,
        value,
        description,
        minOrderValue,
        maxDiscount,
        maxUses,
        expiresAt,
        isActive: true,
        ...(productIds && {
          products: {
            create: productIds.map((productId) => ({ productId })),
          },
        }),
      },
      include: {
        products: {
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
    });
  }

  async findAll(includeInactive = false): Promise<Discount[]> {
    return this.prisma.discount.findMany({
      where: includeInactive ? {} : { isActive: true },
      include: {
        _count: {
          select: { orders: true, products: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id?: string, code?: string): Promise<Discount | null> {
    if (!id && !code) {
      throw new HttpException('Either ID or code must be provided', HttpStatus.BAD_REQUEST);
    }

    return this.prisma.discount.findUnique({
      where: { id, code },
      include: {
        products: {
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
        _count: {
          select: { orders: true },
        },
      },
    });
  }

  async validateCode(code: string, subtotal: number): Promise<{
    valid: boolean;
    discount?: Discount;
    discountAmount?: number;
    error?: string;
  }> {
    const discount = await this.prisma.discount.findUnique({
      where: { code },
    });

    if (!discount) {
      return { valid: false, error: 'Invalid discount code' };
    }

    if (!discount.isActive) {
      return { valid: false, error: 'Discount code is inactive' };
    }

    if (discount.expiresAt && discount.expiresAt < new Date()) {
      return { valid: false, error: 'Discount code has expired' };
    }

    if (discount.maxUses) {
      const usageCount = await this.prisma.order.count({
        where: { discountId: discount.id },
      });

      if (usageCount >= discount.maxUses) {
        return { valid: false, error: 'Discount code has reached maximum usage' };
      }
    }

    if (discount.minOrderValue && subtotal < discount.minOrderValue) {
      return { valid: false, error: `Minimum order value of $${discount.minOrderValue} required` };
    }

    let discountAmount = 0;

    if (discount.type === DiscountType.PERCENTAGE) {
      discountAmount = (subtotal * discount.value) / 100;
      if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
        discountAmount = discount.maxDiscount;
      }
    } else if (discount.type === DiscountType.FIXED) {
      discountAmount = discount.value;
    }

    return { valid: true, discount, discountAmount };
  }

  async update(
    id: string,
    data: {
      code?: string;
      type?: DiscountType;
      value?: number;
      description?: string;
      minOrderValue?: number;
      maxDiscount?: number;
      maxUses?: number;
      expiresAt?: Date;
      isActive?: boolean;
      productIds?: string[];
    },
  ): Promise<Discount> {
    const discount = await this.prisma.discount.findUnique({ where: { id } });

    if (!discount) {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    }

    // Check if code is being changed and already exists
    if (data.code && data.code !== discount.code) {
      const existingDiscount = await this.prisma.discount.findUnique({ where: { code: data.code } });
      if (existingDiscount) {
        throw new HttpException('Discount code already exists', HttpStatus.CONFLICT);
      }
    }

    const updateData: any = { ...data };

    // Handle product associations
    if (data.productIds) {
      await this.prisma.discountProduct.deleteMany({ where: { discountId: id } });
      updateData.products = {
        create: data.productIds.map((productId) => ({ productId })),
      };
      delete updateData.productIds;
    }

    return this.prisma.discount.update({
      where: { id },
      data: updateData,
      include: {
        products: {
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
    });
  }

  async delete(id: string): Promise<boolean> {
    const discount = await this.prisma.discount.findUnique({ where: { id } });
    if (!discount) {
      throw new HttpException('Discount not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.discount.delete({ where: { id } });
    return true;
  }

  async deactivate(id: string): Promise<Discount> {
    return this.update(id, { isActive: false });
  }
}

