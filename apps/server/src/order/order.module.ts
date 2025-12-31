import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [CartModule],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}

