import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '@category/category.entity';
import { CategoryService } from '@category/category.service';
import { CategoryResolver } from '@category/category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
