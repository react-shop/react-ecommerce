import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';

import { CategoryService } from '@category/category.service';
import { CreateCategoryDto } from '@category/dto/create-category.dto';
import { JwtAuthGuard } from '@auth/auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() data: CreateCategoryDto): Promise<any> {
    return await this.categoryService.create(data);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() data: any): Promise<any> {
    return await this.categoryService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    await this.categoryService.delete(id);
  }
}

