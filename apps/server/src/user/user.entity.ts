import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  role: string;

  @Field()
  isActive: boolean;

  @Field()
  emailVerified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Hidden fields
  password?: string;
  googleId?: string;
  githubId?: string;
  emailVerifyToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

