import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/user.decorator';
import { PaymentStatus, PaymentMethod } from '@prisma/client';

@Resolver('Payment')
export class PaymentResolver {
  constructor(private paymentService: PaymentService) {}

  @Query('payments')
  @UseGuards(JwtAuthGuard)
  async getPayments(
    @CurrentUser() user: any,
    @Args('skip') skip?: number,
    @Args('take') take?: number,
  ) {
    // Admin can see all payments, users only their own
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.paymentService.findAll(userId, skip, take);
  }

  @Query('payment')
  @UseGuards(JwtAuthGuard)
  async getPayment(
    @CurrentUser() user: any,
    @Args('id') id: string,
  ) {
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.paymentService.findOne(id, userId);
  }

  @Query('orderPayments')
  @UseGuards(JwtAuthGuard)
  async getOrderPayments(
    @CurrentUser() user: any,
    @Args('orderId') orderId: string,
  ) {
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.paymentService.findByOrder(orderId, userId);
  }

  @Query('paymentStats')
  @UseGuards(JwtAuthGuard)
  async getPaymentStats(@CurrentUser() user: any) {
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.paymentService.getStats(userId);
  }

  @Mutation('createPayment')
  @UseGuards(JwtAuthGuard)
  async createPayment(
    @CurrentUser() user: any,
    @Args('orderId') orderId: string,
    @Args('amount') amount: number,
    @Args('currency') currency: string,
    @Args('method') method: PaymentMethod,
    @Args('transactionId') transactionId?: string,
    @Args('cardLast4') cardLast4?: string,
    @Args('cardBrand') cardBrand?: string,
  ) {
    return this.paymentService.create(
      orderId,
      user.id,
      amount,
      currency,
      method,
      transactionId,
      cardLast4,
      cardBrand,
    );
  }

  @Mutation('updatePaymentStatus')
  @UseGuards(JwtAuthGuard)
  async updatePaymentStatus(
    @Args('id') id: string,
    @Args('status') status: PaymentStatus,
    @Args('failureReason') failureReason?: string,
  ) {
    return this.paymentService.updateStatus(id, status, failureReason);
  }

  @Mutation('refundPayment')
  @UseGuards(JwtAuthGuard)
  async refundPayment(
    @Args('id') id: string,
    @Args('amount') amount?: number,
    @Args('reason') reason?: string,
  ) {
    return this.paymentService.refund(id, amount, reason);
  }
}

