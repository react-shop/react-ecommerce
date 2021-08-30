import { Field, InputType, ObjectType, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Product } from '@product/product.entity';

@ObjectType()
@InputType('CategoryInput')
@Entity()
export class Category {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @Column()
  @IsString()
  @Field()
  name: string;

  @Column()
  @IsString()
  @Field()
  description: string;

  @ManyToOne(
    () => Product,
    product => product.category,
  )
  @Field(() => [Product], {
    nullable: true,
  })
  products: Product[];
}
