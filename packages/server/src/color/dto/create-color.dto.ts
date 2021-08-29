import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsHexColor } from 'class-validator';

@InputType()
export class CreateColorDto {
  @Field()
  @IsHexColor()
  @IsNotEmpty({ message: 'Field required ' })
  readonly hex: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly name: string;
}
