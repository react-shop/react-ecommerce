import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

import { ColorService } from '@color/color.service';
import { Color } from '@color/color.entity';
import { CreateColorDto } from '@color/dto/create-color.dto';

import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver()
export class ColorResolver {
  constructor(private colorService: ColorService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Color)
  async createColor(@Args('data') data: CreateColorDto): Promise<Color> {
    const user = await this.colorService.create(data);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Color], {
    nullable: true,
  })
  async getAllColors(): Promise<Color[]> {
    const colors = await this.colorService.getAll();

    return colors;
  }
}
