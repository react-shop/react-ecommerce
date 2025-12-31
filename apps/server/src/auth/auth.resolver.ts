import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthDto } from '@auth/dto/auth.input';
import { AuthType } from '@auth/dto/auth.interface';
import { AuthService } from '@auth/auth.service';

interface RegisterInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation('register')
  public async register(
    @Args('input') input: RegisterInput,
  ): Promise<AuthType> {
    return await this.authService.register(input);
  }

  @Mutation('login')
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthType> {
    return await this.authService.validateUser({ email, password });
  }
}
