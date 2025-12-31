import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { DiscountType } from '@prisma/client';

@Resolver('Discount')
export class DiscountResolver {
  constructor(private discountService: DiscountService) {}

  @Query('discounts')
  @UseGuards(JwtAuthGuard)
  async getDiscounts(@Args('includeInactive') includeInactive?: boolean) {
    return this.discountService.findAll(includeInactive);
  }

  @Query('discount')
  async getDiscount(
    @Args('id') id?: string,
    @Args('code') code?: string,
  ) {
    return this.discountService.findOne(id, code);
  }

  @Query('validateDiscountCode')
  async validateDiscountCode(
    @Args('code') code: string,
    @Args('subtotal') subtotal: number,
  ) {
    return this.discountService.validateCode(code, subtotal);
  }

  @Mutation('createDiscount')
  @UseGuards(JwtAuthGuard)
  async createDiscount(
    @Args('code') code: string,
    @Args('type') type: DiscountType,
    @Args('value') value: number,
    @Args('description') description?: string,
    @Args('minOrderValue') minOrderValue?: number,
    @Args('maxDiscount') maxDiscount?: number,
    @Args('maxUses') maxUses?: number,
    @Args('expiresAt') expiresAt?: Date,
    @Args('productIds') productIds?: string[],
  ) {
    return this.discountService.create(
      code,
      type,
      value,
      description,
      minOrderValue,
      maxDiscount,
      maxUses,
      expiresAt,
      productIds,
    );
  }

  @Mutation('updateDiscount')
  @UseGuards(JwtAuthGuard)
  async updateDiscount(
    @Args('id') id: string,
    @Args('input') input: any,
  ) {
    return this.discountService.update(id, input);
  }

  @Mutation('deleteDiscount')
  @UseGuards(JwtAuthGuard)
  async deleteDiscount(@Args('id') id: string) {
    return this.discountService.delete(id);
  }

  @Mutation('deactivateDiscount')
  @UseGuards(JwtAuthGuard)
  async deactivateDiscount(@Args('id') id: string) {
    return this.discountService.deactivate(id);
  }
}

