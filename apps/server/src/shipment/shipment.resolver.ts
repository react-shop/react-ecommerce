import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../user/user.decorator';
import { ShipmentStatus } from '@prisma/client';

@Resolver('Shipment')
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  @Query('shipments')
  @UseGuards(JwtAuthGuard)
  async getShipments(
    @CurrentUser() user: any,
    @Args('skip') skip?: number,
    @Args('take') take?: number,
  ) {
    // Admin can see all shipments, users only their own
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.shipmentService.findAll(userId, skip, take);
  }

  @Query('shipment')
  @UseGuards(JwtAuthGuard)
  async getShipment(
    @CurrentUser() user: any,
    @Args('id') id: string,
  ) {
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.shipmentService.findOne(id, userId);
  }

  @Query('orderShipments')
  @UseGuards(JwtAuthGuard)
  async getOrderShipments(
    @CurrentUser() user: any,
    @Args('orderId') orderId: string,
  ) {
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.shipmentService.findByOrder(orderId, userId);
  }

  @Query('trackShipment')
  async trackShipment(@Args('trackingNumber') trackingNumber: string) {
    return this.shipmentService.findByTrackingNumber(trackingNumber);
  }

  @Query('shipmentStats')
  @UseGuards(JwtAuthGuard)
  async getShipmentStats(@CurrentUser() user: any) {
    const userId = user.role === 'ADMIN' ? undefined : user.id;
    return this.shipmentService.getStats(userId);
  }

  @Mutation('createShipment')
  @UseGuards(JwtAuthGuard)
  async createShipment(
    @Args('orderId') orderId: string,
    @Args('addressId') addressId: string,
    @Args('carrier') carrier: string,
    @Args('trackingNumber') trackingNumber?: string,
    @Args('estimatedDeliveryDate') estimatedDeliveryDate?: Date,
  ) {
    return this.shipmentService.create(
      orderId,
      addressId,
      carrier,
      trackingNumber,
      estimatedDeliveryDate,
    );
  }

  @Mutation('updateShipmentStatus')
  @UseGuards(JwtAuthGuard)
  async updateShipmentStatus(
    @Args('id') id: string,
    @Args('status') status: ShipmentStatus,
    @Args('notes') notes?: string,
  ) {
    return this.shipmentService.updateStatus(id, status, notes);
  }

  @Mutation('updateShipment')
  @UseGuards(JwtAuthGuard)
  async updateShipment(
    @Args('id') id: string,
    @Args('input') input: any,
  ) {
    return this.shipmentService.update(id, input);
  }

  @Mutation('cancelShipment')
  @UseGuards(JwtAuthGuard)
  async cancelShipment(
    @Args('id') id: string,
    @Args('reason') reason?: string,
  ) {
    return this.shipmentService.cancel(id, reason);
  }
}

