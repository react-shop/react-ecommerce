import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { AttributeService } from '@attribute/attribute.service';
import { Attribute } from '@attribute/attribute.entity';
import { CreateAttributeDto } from '@attribute/dto/create-attribute.dto';

import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver()
export class AttributeResolver {
  constructor(private attributeService: AttributeService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Attribute)
  async createAttribute(@Args('data') data: CreateAttributeDto): Promise<Attribute> {
    const attribute = await this.attributeService.create(data);

    return attribute;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Attribute], {
    nullable: true,
  })
  async getAllAttributes(): Promise<Attribute[]> {
    const attributes = await this.attributeService.getAll();

    return attributes;
  }
}
