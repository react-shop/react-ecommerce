import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { ProductService } from '@product/product.service';
import { Product } from '@product/product.entity';
import { CreateProductDto, LinkColorToProductDto } from '@product/dto';

import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProductDto): Promise<Product> {
    const user = await this.productService.create(data);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Product], {
    nullable: true,
  })
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.findAll();

    return products;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product, {
    nullable: true,
  })
  async linkColorToProduct(@Args('data') data: LinkColorToProductDto): Promise<Product> {
    const store = await this.productService.linkColor(data);

    return store;
  }
}
