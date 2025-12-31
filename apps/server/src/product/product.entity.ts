import { Field, ID, ObjectType, Float, Int } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  shortDesc?: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  sku?: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => Int, { defaultValue: 0 })
  stock: number;

  @Field(() => Float, { nullable: true })
  compareAtPrice?: number;

  @Field(() => Float, { nullable: true })
  costPrice?: number;

  @Field(() => Boolean, { defaultValue: true })
  isActive: boolean;

  @Field(() => Boolean, { defaultValue: false })
  isFeatured: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

