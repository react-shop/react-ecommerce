import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LinkCategoryToProductDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly productId: string;

  @Field(() => [ID])
  @IsNotEmpty({ message: 'Field required ' })
  readonly categoriesId: string[];
}
