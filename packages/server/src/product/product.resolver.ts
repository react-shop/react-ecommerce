import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { ProductService } from '@product/product.service';
import { Product } from '@product/product.entity';
import { CreateProductDto, LinkAttributeToProductDto } from '@product/dto';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Product, {
    nullable: true,
  })
  async linkAttributeToProduct(@Args('data') data: LinkAttributeToProductDto): Promise<Product> {
    const product = await this.productService.linkAttribute(data);

    return product;
  }
}
