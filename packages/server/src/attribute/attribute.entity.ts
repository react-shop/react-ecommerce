import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

import { Product } from '@product/product.entity';

import { Types } from '@attribute/attribute.interface';

@ObjectType()
@InputType('AttributeInput')
@Entity()
export class Attribute {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'enum',
    enum: Types,
    nullable: true,
  })
  @Field(() => Types)
  type: Types;

  @Column()
  value: string;

  @Column()
  name: string;

  @ManyToOne(
    () => Product,
    product => product.attributes,
  )
  @Field(() => Product, {
    nullable: true,
  })
  product: Product;
}
