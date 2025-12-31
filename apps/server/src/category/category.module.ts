import { Module } from '@nestjs/common';
import { CategoryService } from '@category/category.service';
import { CategoryResolver } from '@category/category.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
