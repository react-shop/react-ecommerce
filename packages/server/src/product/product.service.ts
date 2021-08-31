import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { Product } from '@product/product.entity';
import {
  CreateProductDto,
  LinkAttributeToProductDto,
  LinkCategoryToProductDto,
} from '@product/dto';

import { Helpers } from '@utils/helpers';
import { Attribute } from '@attribute/attribute.entity';
import { Category } from '@category/category.entity';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private helpers: Helpers,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const { title, description, price, dimension, quantity, attributes, brand } = dto;

    const newProduct = new Product();
    newProduct.title = title;
    newProduct.description = description;
    newProduct.dimension = dimension;
    newProduct.price = price;
    newProduct.brand = brand;
    newProduct.quantity = quantity;
    newProduct.attributes = attributes;

    attributes.forEach(attribute => {
      newProduct.sku = this.helpers.generateSku({
        name: title,
        brand,
        attributeName: attribute.name,
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
      relations: ['attributes', 'store', 'categories'],
    });

    return products;
  }

  async linkAttribute({ productId, attributesId }: LinkAttributeToProductDto): Promise<Product> {
    const product = await this.productRepository.findOne(productId, {
      relations: ['attributes', 'store', 'categories'],
    });
    const attributes = await this.attributeRepository.findByIds(attributesId);

    if (!product) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    attributes.forEach(async attribute => {
      if (!attribute) {
        const errors = { Attribute: `${attribute.name} not found` };
        throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
      }
    });

    await getRepository(Product)
      .createQueryBuilder()
      .relation(Product, 'attributes')
      .of(productId)
      .add(attributesId);

    const productUpdated = await this.productRepository.findOne(productId, {
      relations: ['attributes', 'store', 'categories'],
    });

    return productUpdated;
  }

  async linkCategory({ productId, categoriesId }: LinkCategoryToProductDto): Promise<Product> {
    const product = await this.productRepository.findOne(productId, {
      relations: ['attributes', 'store', 'categories'],
    });
    const categories = await this.categoryRepository.findByIds(categoriesId);

    if (!product) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    categories.forEach(async category => {
      if (!category) {
        const errors = { Category: `${category.name} not found` };
        throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
      }
    });

    await getRepository(Product)
      .createQueryBuilder()
      .relation(Product, 'categories')
      .of(productId)
      .add(categoriesId);

    const productUpdated = await this.productRepository.findOne(productId, {
      relations: ['attributes', 'store', 'categories'],
    });

    return productUpdated;
  }
}
