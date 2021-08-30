import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

import { Color } from '@color/color.entity';
import { Store } from '@store/store.entity';
@ObjectType()
@InputType('ProductInput')
@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  brand: string;

  @Column({
    unique: true,
  })
  sku: string;

  @Column()
  price: number;

  @Column({ default: '' })
  thumbnail: string;

  @Column({ default: '' })
  images: string; //TODO - array images

  @Column({ default: 0 })
  reviews: number;

  @Column()
  quantity: number;

  @Column()
  dimension: string;

  @OneToMany(
    () => Color,
    color => color.product,
    {
      cascade: true,
    },
  )
  @JoinTable()
  @Field(() => [Color], {
    nullable: true,
  })
  colors: Color[];

  @ManyToOne(
    () => Store,
    (store: Store) => store.products,
  )
  @Field(() => Store, {
    nullable: true,
  })
  store: Store;
}
