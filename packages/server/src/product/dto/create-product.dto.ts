import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';

import { Color } from '@color/color.entity';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly title: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly description: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly brand: string;

  @Field()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty({ message: 'Field required ' })
  readonly price: number;

  @Field()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty({ message: 'Field required ' })
  readonly quantity: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly dimension: string;

  @IsNotEmpty({ message: 'Field required ' })
  @Field(() => [Color], {
    nullable: true,
  })
  readonly colors: Color[];
}
