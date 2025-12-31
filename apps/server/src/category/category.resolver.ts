import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { CategoryService } from '@category/category.service';
import { Category } from '@category/category.entity';
import { CreateCategoryDto } from '@category/dto/create-category.dto';

import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  async createCategory(@Args('data') data: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryService.create(data);

    return category;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Category], {
    nullable: true,
  })
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryService.findAll();

    return categories;
  }
}
