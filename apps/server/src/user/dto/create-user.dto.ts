import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly username: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Field required ' })
  readonly email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  @MinLength(6, { message: 'The password need have more than 6 characters' })
  readonly password: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  @MinLength(6, { message: 'The password need have more than 6 characters' })
  readonly confirmPassword: string;
}
