import { UsePipes } from '@nestjs/common';

import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';

import { UserService } from '@user/user.service';
import { UserEntity } from '@user/user.entity';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserModel } from '@user/user.interface';

import { ValidationPipe } from '@shared/pipes/validation.pipe';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserEntity)
  async findById(@Args('id') id: string): Promise<UserModel> {
    const user = this.userService.findById(id);

    return user;
  }

  @UsePipes(new ValidationPipe())
  @Mutation(() => UserEntity)
  async create(@Args('data') data: CreateUserDto): Promise<UserModel> {
    const user = await this.userService.create(data);

    return user;
  }
}
