import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

import { Product } from '@product/product.entity';

import { User } from '@user/user.entity';

@InputType()
export class CreateStoreDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly bio: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly slug: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly street: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly city: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly state: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly country: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly neighborhood: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly zipCode: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly number: string;

  @Field(() => [Product], {
    nullable: true,
  })
  readonly products: Product[];

  @Field(() => [User], {
    nullable: true,
  })
  readonly employees: User[];
}
