import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attribute } from '@attribute/attribute.entity';
import { AttributeService } from '@attribute/attribute.service';
import { AttributeResolver } from '@attribute/attribute.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  providers: [AttributeService, AttributeResolver],
  exports: [AttributeService],
})
export class AttributeModule {}
