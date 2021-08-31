import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository, In, getConnection } from 'typeorm';
import { validate } from 'class-validator';

import { Store } from '@store/store.entity';
import { CreateStoreDto, LinkProductToStoreDto, LinkEmployeeToStoreDto } from '@store/dto';

import { User } from '@user/user.entity';
import { Product } from '@product/product.entity';
import { Helpers } from '@utils/helpers';
import { Roles } from '@user/user.interface';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private helpers: Helpers,
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
      employeesId,
    } = dto;

    const store = await this.storeRepository.findOne({
      where: {
        slug,
      },
    });

    if (store) {
      const errors = { message: 'Slug must be unique.' };
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

    if (employeesId?.length > 0) {
      const users = await this.userRepository.findByIds(employeesId);

      const userExists = this.helpers.dataExists({ data: users, dataIds: employeesId });

      if (!userExists) {
        throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);
      }

      newStore.employees = users;
    }

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

    const users = await this.userRepository.findByIds(employeesId);

    const userExists = this.helpers.dataExists({
      data: users,
      dataIds: employeesId,
    });

    if (!store) {
      throw new HttpException({ message: 'Store not found' }, HttpStatus.BAD_REQUEST);
    }

    if (!userExists) {
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);
    }

    store.employees.forEach(employee => {
      employeesId.forEach(id => {
        if (employee.id === id) {
          throw new HttpException(
            { message: 'Employee already registered to store' },
            HttpStatus.BAD_REQUEST,
          );
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

    if (storeUpdated) {
      await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ role: Roles.SELLER })
        .where({ id: In(employeesId) })
        .execute();
    }

    return storeUpdated;
  }

  async linkProducts({ storeId, productsId }: LinkProductToStoreDto): Promise<Store> {
    const store = await this.storeRepository.findOne(storeId, {
      relations: ['products', 'employees'],
    });

    const products = await this.productRepository.findByIds(productsId);

    const productsExists = this.helpers.dataExists({
      data: products,
      dataIds: productsId,
    });

    if (!store) {
      throw new HttpException({ message: 'Store: not found' }, HttpStatus.BAD_REQUEST);
    }

    if (!productsExists) {
      throw new HttpException({ message: 'Product not found' }, HttpStatus.BAD_REQUEST);
    }

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
