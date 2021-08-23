export enum Roles {
  MEMBER = 'member',
  ADMIN = 'admin',
  SELLER = 'seller',
}

export enum Status {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export interface UserData {
  id: string;
  username: string;
  email: string;
  bio: string;
  image: string;
  role: Roles;
  status: Status;
  token?: string;
}

export interface UserModel {
  user: UserData;
}
