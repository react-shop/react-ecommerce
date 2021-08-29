import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Store } from '@store/store.entity';
import { StoreService} from '@store/store.service';
import { StoreResolver } from '@store/store.resolver';
import { User } from '@user/user.entity';
import { Product } from '@product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Product])],
  providers: [StoreService, StoreResolver],
  exports: [StoreService],
})
export class StoreModule {}
