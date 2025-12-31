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
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  avatar?: string | null;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  password?: string | null;
  // Legacy fields - not used but kept for compatibility
  name?: string;
  username?: string;
  bio?: string;
  image?: string;
  status?: Status;
}

export interface UserModel {
  user: UserData;
}
