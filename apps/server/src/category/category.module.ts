import { Module } from '@nestjs/common';
import { CategoryService } from '@category/category.service';
import { CategoryController } from '@category/category.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
