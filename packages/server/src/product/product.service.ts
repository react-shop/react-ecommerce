import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

import { Product } from '@product/product.entity';
import { CreateProductDto } from '@product/dto/create-product.dto';

import { Helpers } from '@utils/helpers';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private helpers: Helpers,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const { title, description, price, dimension, quantity, colors, brand } = dto;

    const newProduct = new Product();
    newProduct.title = title;
    newProduct.description = description;
    newProduct.dimension = dimension;
    newProduct.price = price;
    newProduct.brand = brand;
    newProduct.quantity = quantity;
    newProduct.colors = colors;

    colors.forEach(color => {
      newProduct.sku = this.helpers.generateSku({
        name: title,
        brand,
        colorName: color.name,
      });
    });

    const errors = await validate(newProduct);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Input data validation failed' }, HttpStatus.BAD_REQUEST);
    } else {
      const savedProduct = await this.productRepository.save(newProduct);

      return savedProduct;
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['colors'],
    });

    return products;
  }
}
