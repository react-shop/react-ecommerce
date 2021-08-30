import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

import { Product } from '@product/product.entity';

@ObjectType()
@InputType('ColorInput')
@Entity()
export class Color {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @Column({
    length: '7',
    unique: true,
  })
  hex: string;

  @Column()
  name: string;

  @ManyToOne(
    () => Product,
    product => product.colors,
  )
  @Field(() => Product, {
    nullable: true,
  })
  product: Product;
}
