import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class LinkEmployeeToStoreDto {
  @Field()
  @IsNumber()
  @IsNotEmpty({ message: 'Field required ' })
  readonly storeId: string;

  @Field(() => [ID])
  readonly employeesId: string[];
}
