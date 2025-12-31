import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required' })
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field required' })
  readonly slug: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly shortDesc?: string;

  @Field()
  @IsPositive()
  @IsNumber()
  @IsNotEmpty({ message: 'Field required' })
  readonly price: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly sku?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly status?: string;

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  readonly categoryIds?: string[];

  @Field(() => [ID], { nullable: true })
  @IsOptional()
  readonly tagIds?: string[];

  @Field({ nullable: true })
  @IsOptional()
  readonly images?: Array<{
    url: string;
    alt?: string;
    sortOrder?: number;
    isPrimary?: boolean;
  }>;
}
