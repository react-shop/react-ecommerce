import { Module } from '@nestjs/common';
import { ProductController } from '@product/product.controller';
import { ProductService } from '@product/product.service';
import { Helpers } from '@utils/helpers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, Helpers],
  exports: [ProductService],
})
export class ProductModule {}
