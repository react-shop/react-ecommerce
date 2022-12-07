import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthDto } from '@auth/dto/auth.input';
import { AuthType } from '@auth/dto/auth.interface';
import { AuthService } from '@auth/auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: AuthDto): Promise<AuthType> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token,
    };
  }
}
