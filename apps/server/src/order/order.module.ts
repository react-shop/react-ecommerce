import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { CartModule } from '../cart/cart.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [CartModule, PrismaModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}

