import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '@auth/auth.service';
import { AuthResolver } from '@auth/auth.resolver';
import { JwtStrategy } from '@auth/jwt.strategy';

import { UserService } from '@user/user.service';
import { User } from '@user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: {
          expiresIn: '60m',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, UserService, JwtStrategy],
})
export class AuthModule {}
