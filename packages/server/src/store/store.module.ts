import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Store } from '@store/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [],
  exports: [],
})
export class StoreModule {}
