import { Types } from '@attribute/attribute.interface';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

@InputType()
export class CreateAttributeDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly value: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required ' })
  readonly name: string;

  @Field()
  @IsEnum(Types)
  @IsNotEmpty({ message: 'Field required ' })
  readonly type: Types;
}
