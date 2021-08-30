import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

import { Attribute } from '@attribute/attribute.entity';
import { Store } from '@store/store.entity';
import { Category } from '@category/category.entity';
@ObjectType()
@InputType('ProductInput')
@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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
    () => Attribute,
    attribute => attribute.product,
    {
      cascade: true,
    },
  )
  @JoinTable()
  @Field(() => [Attribute], {
    nullable: true,
  })
  attributes: Attribute[];

  @ManyToOne(
    () => Store,
    (store: Store) => store.products,
  )
  @Field(() => Store, {
    nullable: true,
  })
  store: Store;

  @OneToMany(
    () => Category,
    category => category.products,
    {
      cascade: true,
    },
  )
  @JoinTable()
  @Field(() => [Attribute], {
    nullable: true,
  })
  category: Category[];
}
