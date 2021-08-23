import { Get, Post, Body, Controller, UsePipes, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserModel } from '@user/user.interface';
import { UserService } from '@user/user.service';
import { User } from '@user/user.decorator';
import { CreateUserDto, LoginUserDto } from '@user/dto';

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

  @UsePipes(new ValidationPipe())
  @Post('user/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserModel> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { email, username, bio, image, id, role, status } = _user;

    return { user: { email, token, username, bio, image, id, role, status } };
  }
}
