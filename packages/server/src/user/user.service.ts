import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { validate } from 'class-validator';

import { User } from '@user/user.entity';
import { Status, UserData } from '@user/user.interface';
import { CreateUserDto } from '@user/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ email: email });

    return user;
  }

  async findById(id: string): Promise<UserData> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = { User: 'not found' };
      throw new HttpException({ errors }, 401);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<UserData> {
    // check uniqueness of username/email
    const { username, email, password, name, confirmPassword } = dto;
    const qb = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { username: 'Username and email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password !== confirmPassword) {
      throw new HttpException({ message: 'The password must be equals' }, HttpStatus.BAD_REQUEST);
    }

    // create new user
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    }
  }

  async delete(id: string): Promise<UserData> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    await this.userRepository.update(id, { status: Status.DISABLED });

    return user;
  }
}
