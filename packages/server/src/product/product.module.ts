import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@product/product.entity';
import { ProductResolver } from '@product/product.resolver';
import { ProductService } from '@product/product.service';

import { Attribute } from '@attribute/attribute.entity';
import { Category } from '@category/category.entity';

import { Helpers } from '@utils/helpers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Attribute]),
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [ProductResolver, ProductService, Helpers],
  exports: [ProductService],
})
export class ProductModule {}
