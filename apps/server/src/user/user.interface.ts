import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  MEMBER = 'member',
  ADMIN = 'admin',
  SELLER = 'seller',
}

registerEnumType(Roles, {
  name: 'Roles',
  description: 'User possible roles',
});

export enum Status {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Account status',
});

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  image: string;
  role: Roles;
  status: Status;
  password: string;
  token?: string;
}

export interface UserModel {
  user: UserData;
}
