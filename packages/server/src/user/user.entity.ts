import { Field, ObjectType, ID } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Roles, Status } from '@user/user.interface';
import { IsEmail } from 'class-validator';

@ObjectType()
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    length: '256',
  })
  name: string;

  @Column({
    length: '100',
  })
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.MEMBER,
  })
  role: Roles;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
