import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from '@category/dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const { name, description, slug, image, parentId } = dto;

    // Check if category already exists
    const existingCategory = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      const errors = { message: 'This category already been registered' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create new category
    const newCategory = await this.prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
        parentId,
        isActive: true,
        sortOrder: 0,
      },
      include: {
        parent: true,
        children: true,
      },
    });

    return newCategory;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        productCategories: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });

    return categories;
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        productCategories: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: true,
        productCategories: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: Partial<CreateCategoryDto>) {
    return this.prisma.category.update({
      where: { id },
      data: dto,
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async delete(id: string) {
    await this.prisma.category.delete({
      where: { id },
    });
    return true;
  }
}
