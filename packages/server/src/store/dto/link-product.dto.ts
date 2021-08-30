import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LinkProductToStoreDto {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly storeId: string;

  @Field(() => [ID])
  readonly productsId: string[];
}
