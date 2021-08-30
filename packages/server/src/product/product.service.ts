import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Product } from '@product/product.entity';
import { CreateProductDto, LinkColorToProductDto } from '@product/dto';

import { Helpers } from '@utils/helpers';
import { Color } from '@color/color.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
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
      relations: ['colors', 'store'],
    });

    return products;
  }

  async linkColor({ productId, colorsId }: LinkColorToProductDto): Promise<Product> {
    const product = await this.productRepository.findOne(productId, {
      relations: ['colors', 'store'],
    });
    const colors = await this.colorRepository.findByIds(colorsId);

    if (!product) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, 401);
    }

    colors.forEach(async color => {
      if (!color) {
        const errors = { Color: `${color.name} not found` };
        throw new HttpException({ errors }, 401);
      }
    });

    await getRepository(Product)
      .createQueryBuilder()
      .relation(Product, 'colors')
      .of(productId)
      .add(colorsId);

    const productUpdated = await this.productRepository.findOne(productId, {
      relations: ['colors', 'store'],
    });

    return productUpdated;
  }
}
