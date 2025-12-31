import { Module } from '@nestjs/common';
import { ProductResolver } from '@product/product.resolver';
import { ProductService } from '@product/product.service';
import { Helpers } from '@utils/helpers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ProductResolver, ProductService, Helpers],
  exports: [ProductService],
})
export class ProductModule {}
