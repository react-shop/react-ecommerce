import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';

@Module({
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}

