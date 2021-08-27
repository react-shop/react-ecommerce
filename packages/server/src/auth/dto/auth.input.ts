import { InputType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class AuthDto {
  @Field()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly password: string;
}
