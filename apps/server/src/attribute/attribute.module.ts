import { Module } from '@nestjs/common';
import { AttributeService } from '@attribute/attribute.service';
import { AttributeResolver } from '@attribute/attribute.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AttributeService, AttributeResolver],
  exports: [AttributeService],
})
export class AttributeModule {}
