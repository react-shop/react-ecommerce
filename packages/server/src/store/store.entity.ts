import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Field, ObjectType, ID } from '@nestjs/graphql';

import { Product } from '@product/product.entity';

import { User } from '@user/user.entity';

@ObjectType()
@Entity()
export class Store {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @Column()
  name: string;

  @Column()
  bio: string;

  @Column({
    default: 0,
  })
  rate: number;

  @Column({
    unique: true,
  })
  slug: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  neighborhood: string;

  @Column()
  number: string;

  @Column()
  zipCode: string;

  @Column({
    default: 0,
  })
  sales: number;

  @ManyToMany(() => Product)
  @JoinTable()
  @Field(() => [Product], {
    nullable: true,
  })
  products: Product[];

  @ManyToMany(() => User)
  @JoinTable()
  @Field(() => [User], {
    nullable: true,
  })
  employees: User[];
}