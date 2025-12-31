import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/user.decorator';
import { OrderStatus } from '@prisma/client';

@Resolver('Order')
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query('orders')
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @CurrentUser() user: any,
    @Args('skip') skip?: number,
    @Args('take') take?: number,
  ) {
    return this.orderService.getOrders(user.id, skip, take);
  }

  @Query('order')
  @UseGuards(JwtAuthGuard)
  async getOrder(@CurrentUser() user: any, @Args('id') id: string) {
    return this.orderService.getOrder(user.id, id);
  }

  @Mutation('createOrder')
  @UseGuards(JwtAuthGuard)
  async createOrder(@CurrentUser() user: any, @Args('input') input: any) {
    return this.orderService.createOrder(
      user.id,
      input.shippingAddressId,
      input.billingAddressId,
      input.paymentMethod,
    );
  }

  @Mutation('updateOrderStatus')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(@Args('id') id: string, @Args('status') status: OrderStatus) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @Mutation('cancelOrder')
  @UseGuards(JwtAuthGuard)
  async cancelOrder(@CurrentUser() user: any, @Args('id') id: string) {
    return this.orderService.cancelOrder(user.id, id);
  }

  @Query('adminOrders')
  @UseGuards(JwtAuthGuard)
  async getAdminOrders(
    @Args('skip') skip?: number,
    @Args('take') take?: number,
    @Args('status') status?: OrderStatus,
  ) {
    return this.orderService.getAllOrders(skip, take, status);
  }
}

