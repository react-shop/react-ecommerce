import { Controller, Get, Post, Body, Param, UseGuards, UsePipes } from '@nestjs/common';

import { UserService } from '@user/user.service';
import { CreateUserDto } from '@user/dto';
import { User } from '@user/user.entity';

import { ValidationPipe } from '@shared/pipes/validation.pipe';
import { JwtAuthGuard } from '@auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<any> {
    return await this.userService.findById(id);
  }

  @Get('email/:email')
  @UseGuards(JwtAuthGuard)
  async findByEmail(@Param('email') email: string): Promise<any> {
    return await this.userService.findByEmail(email);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() data: CreateUserDto): Promise<any> {
    return await this.userService.create(data);
  }
}

