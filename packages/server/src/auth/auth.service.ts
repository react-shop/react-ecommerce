import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { AuthDto } from '@auth/dto/auth.input';
import { UserService } from '@user/user.service';
import { AuthType } from '@auth/dto/auth.interface';
import { User } from '@user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(data: AuthDto): Promise<AuthType> {
    const user = await this.userService.findByEmail(data.email);

    const validPassword = compareSync(data.password, user.password);

    if (!validPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }

    const token = await this.generateJWT(user);

    return {
      user,
      token,
    };
  }

  public async generateJWT(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };

    return this.jwtService.signAsync(payload);
  }
}
