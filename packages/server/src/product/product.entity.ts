import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

import { Color } from '@color/color.entity';

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

  @ManyToMany(() => Color)
  @JoinTable()
  @Field(() => [Color], {
    nullable: true,
  })
  colors: Color[];
}
