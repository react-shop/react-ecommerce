import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required' })
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required' })
  readonly description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly slug?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly image?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly parentId?: string;
}
