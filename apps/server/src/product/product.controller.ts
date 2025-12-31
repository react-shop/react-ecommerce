import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';

import { ProductService } from '@product/product.service';
import { CreateProductDto } from '@product/dto';
import { JwtAuthGuard } from '@auth/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreateProductDto): Promise<any> {
    return await this.productService.create(data);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any): Promise<any> {
    return await this.productService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    await this.productService.delete(id);
  }
}

