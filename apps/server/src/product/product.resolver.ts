import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { ProductService } from '@product/product.service';
import { Product } from '@product/product.entity';
import { CreateProductDto } from '@product/dto';

import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductDto): Promise<Product> {
    const product = await this.productService.create(data);

    return product;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Product], {
    nullable: true,
  })
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.findAll();

    return products;
  }

  // TODO: Add linkCategoryToProduct and other mutations when needed
}
