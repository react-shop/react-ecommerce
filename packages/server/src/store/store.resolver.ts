import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { StoreService } from '@store/store.service';
import { Store } from '@store/store.entity';
import { CreateStoreDto } from '@store/dto/create-store.dto';

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
}
