import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { StoreService } from '@store/store.service';
import { Store } from '@store/store.entity';
import { CreateStoreDto, LinkEmployeeToStoreDto, LinkProductToStoreDto } from '@store/dto';

import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver()
export class StoreResolver {
  constructor(private storeService: StoreService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Store)
  async createStore(@Args('data') data: CreateStoreDto): Promise<Store> {
    const store = await this.storeService.create(data);

    return store;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Store, {
    nullable: true,
  })
  async linkEmployeesToStore(@Args('data') data: LinkEmployeeToStoreDto): Promise<Store> {
    const store = await this.storeService.linkEmployees(data);

    return store;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Store, {
    nullable: true,
  })
  async linkProductsToStore(@Args('data') data: LinkProductToStoreDto): Promise<Store> {
    const store = await this.storeService.linkProducts(data);

    return store;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Store, {
    nullable: true,
  })
  async findStoreById(@Args('id') id: string): Promise<Store> {
    const store = await this.storeService.findById(id);

    return store;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Store], {
    nullable: true,
  })
  async getAllStores(): Promise<Store[]> {
    const stores = await this.storeService.findAll();

    return stores;
  }
}
