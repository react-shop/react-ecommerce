import { Get, Post, Body, Controller, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserModel } from '@user/user.interface';
import { UserService } from '@user/user.service';
import { User } from '@user/user.decorator';
import { CreateUserDto } from '@user/user.dto';

import { ValidationPipe } from '@shared/pipes/validation.pipe';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserModel> {
    return await this.userService.findByEmail(email);
  }

  @UsePipes(new ValidationPipe())
  @Post('user')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
