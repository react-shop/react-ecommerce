import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@product/product.entity';
import { ProductResolver } from '@product/product.resolver';
import { ProductService } from '@product/product.service';

import { Color } from '@color/color.entity';

import { Helpers } from '@utils/helpers';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), TypeOrmModule.forFeature([Color])],
  providers: [ProductResolver, ProductService, Helpers],
  exports: [ProductService],
})
export class ProductModule {}
