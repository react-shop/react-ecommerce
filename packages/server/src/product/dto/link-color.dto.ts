import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LinkColorToProductDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly productId: string;

  @Field(() => [ID])
  readonly colorsId: string[];
}
