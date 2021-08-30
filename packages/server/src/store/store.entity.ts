import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

import { Product } from '@product/product.entity';

import { User } from '@user/user.entity';

@ObjectType()
@InputType('StoreInput')
@Entity()
export class Store {
  @PrimaryGeneratedColumn('increment')
  @Field(() => ID)
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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

  @OneToMany(() => Product, (product: Product) => product.store, {
    cascade: true,
  })
  @JoinTable()
  @Field(() => [Product], {
    nullable: true,
  })
  products: Product[];

  @ManyToMany(() => User, (user: User) => user.store, {
    cascade: true,
  })
  @JoinTable()
  @Field(() => [User], {
    nullable: true,
  })
  employees: User[];
}