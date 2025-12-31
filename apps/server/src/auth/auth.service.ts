import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { AuthDto } from '@auth/dto/auth.input';
import { UserService } from '@user/user.service';
import { AuthType } from '@auth/dto/auth.interface';
import { User } from '@user/user.entity';

interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(input: RegisterInput): Promise<AuthType> {
    // Check if user already exists
    const existingUser = await this.userService.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create new user
    const fullName = [input.firstName, input.lastName]
      .filter(Boolean)
      .join(' ')
      .trim() || input.email.split('@')[0];

    const user = await this.userService.create({
      email: input.email,
      password: input.password,
      name: fullName,
      username: input.email.split('@')[0],
      role: 'CUSTOMER',
    });

    // Generate JWT tokens
    const accessToken = await this.generateJWT(user);
    const refreshToken = await this.generateJWT(user); // TODO: Implement proper refresh token

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async validateUser(data: AuthDto): Promise<AuthType> {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }

    // Generate JWT tokens
    const accessToken = await this.generateJWT(user);
    const refreshToken = await this.generateJWT(user); // TODO: Implement proper refresh token

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  public async generateJWT(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };

    return this.jwtService.signAsync(payload);
  }
}
