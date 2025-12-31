import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  parentId?: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

