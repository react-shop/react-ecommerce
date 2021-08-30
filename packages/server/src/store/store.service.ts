import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';

import { Store } from '@store/store.entity';
import { CreateStoreDto, LinkProductToStoreDto, LinkEmployeeToStoreDto } from '@store/dto';

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

  async findAll(): Promise<Store[]> {
    const stores = await this.storeRepository.find({
      relations: ['employees', 'products', 'products.attributes'],
    });

    return stores;
  }

  async findById(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne(id, {
      relations: ['employees', 'products'],
    });

    return store;
  }

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

  async linkEmployees({ storeId, employeesId }: LinkEmployeeToStoreDto): Promise<Store> {
    const store = await this.storeRepository.findOne(storeId, {
      relations: ['employees', 'products'],
    });
    const employees = await this.userRepository.findByIds(employeesId);

    if (!store) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    employees.forEach(async employee => {
      if (!employee) {
        const errors = { User: 'not found' };
        throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
      }
    });

    store.employees.forEach(employee => {
      employeesId.forEach(id => {
        if (employee.id === id) {
          const errors = { User: 'Employee already registered to store' };
          throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
        }
      });
    });

    await getRepository(Store)
      .createQueryBuilder()
      .relation(Store, 'employees')
      .of(storeId)
      .add(employeesId);

    const storeUpdated = await this.storeRepository.findOne(storeId, {
      relations: ['products', 'employees'],
    });

    return storeUpdated;
  }

  async linkProducts({ storeId, productsId }: LinkProductToStoreDto): Promise<Store> {
    const store = await this.storeRepository.findOne(storeId, {
      relations: ['products', 'employees'],
    });
    const products = await this.productRepository.findByIds(productsId);

    if (!store) {
      const errors = { Store: 'not found' };
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    products.forEach(async product => {
      if (!product) {
        const errors = { Product: 'not found' };
        throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
      }
    });

    await getRepository(Store)
      .createQueryBuilder()
      .relation(Store, 'products')
      .of(storeId)
      .add(productsId);

    const storeUpdated = await this.storeRepository.findOne(storeId, {
      relations: ['products', 'employees'],
    });

    return storeUpdated;
  }
}
