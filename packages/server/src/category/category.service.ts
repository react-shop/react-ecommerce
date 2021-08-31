import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Category } from '@category/category.entity';
import { CreateCategoryDto } from '@category/dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { name, description } = dto;
    const qb = await getRepository(Category)
      .createQueryBuilder('category')
      .where('category.name = :name', { name });

    const category = await qb.getOne();

    if (category) {
      const errors = { message: 'This category already been registered' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCategory = new Category();
    newCategory.name = name;
    newCategory.description = description;

    const errors = await validate(newCategory);
    if (errors.length > 0) {
      const _errors = { name: 'Name is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedCategory = await this.categoryRepository.save(newCategory);

      return savedCategory;
    }
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }
}
