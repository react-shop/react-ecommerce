import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';

import { Store, LinkEmployeeParams, LinkProductParams } from '@store/store.entity';
import { CreateStoreDto } from '@store/dto/create-store.dto';

import { User } from '@user/user.entity';
import { Product } from '@product/product.entity';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateStoreDto): Promise<Store> {
    const {
      name,
      slug,
      bio,
      city,
      country,
      neighborhood,
      number,
      street,
      state,
      zipCode,
      employees,
      products,
    } = dto;
    const qb = await getRepository(Store)
      .createQueryBuilder('store')
      .where('store.slug = :slug', { slug });

    const store = await qb.getOne();

    if (store) {
      const errors = { slug: 'Slug must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newStore = new Store();
    newStore.name = name;
    newStore.bio = bio;
    newStore.slug = slug;
    newStore.street = street;
    newStore.city = city;
    newStore.zipCode = zipCode;
    newStore.state = state;
    newStore.country = country;
    newStore.neighborhood = neighborhood;
    newStore.number = number;
    newStore.employees = employees;
    newStore.products = products;

    const errors = await validate(newStore);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedStore = await this.storeRepository.save(newStore);

      return savedStore;
    }
  }

  async linkEmployee({ storeId, employeeId }: LinkEmployeeParams): Promise<Store> {
    const store = await this.storeRepository.findOne(storeId);
    const employee = await this.userRepository.findOne(employeeId);

    if (!store) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, 401);
    }

    if (!employee) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, 401);
    }

    const storeUpdated = await this.storeRepository.save({
      ...store,
      employees: [...store.employees, employee],
    });

    return storeUpdated;
  }

  async linkProducts({ storeId, productId }: LinkProductParams): Promise<Store> {
    const store = await this.storeRepository.findOne(storeId);
    const product = await this.productRepository.findOne(productId);

    if (!store) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, 401);
    }

    if (!product) {
      const errors = { Product: 'not found' };
      throw new HttpException({ errors }, 401);
    }

    const storeUpdated = await this.storeRepository.save({
      ...store,
      products: [...store.employees, product],
    });

    return storeUpdated;
  }
}
