import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';

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
}
