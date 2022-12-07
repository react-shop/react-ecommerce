import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @Field(() => [ID], {
    nullable: true,
  })
  readonly employeesId: string[];
}
