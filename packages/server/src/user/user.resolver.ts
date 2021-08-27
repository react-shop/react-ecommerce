import { UseGuards, UsePipes } from '@nestjs/common';

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { UserService } from '@user/user.service';
import { User } from '@user/user.entity';
import { CreateUserDto } from '@user/dto';
import { UserData } from '@user/user.interface';

import { ValidationPipe } from '@shared/pipes/validation.pipe';
import { GqlAuthGuard } from '@auth/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async findById(@Args('id') id: string): Promise<UserData> {
    const user = this.userService.findById(id);

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async findByEmail(@Args('email') email: string): Promise<UserData> {
    const user = this.userService.findByEmail(email);

    return user;
  }

  @UsePipes(new ValidationPipe())
  @Mutation(() => User)
  async create(@Args('data') data: CreateUserDto): Promise<UserData> {
    const user = await this.userService.create(data);

    return user;
  }
}
