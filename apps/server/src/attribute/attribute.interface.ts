import { registerEnumType } from '@nestjs/graphql';

export enum Types {
  COLOR = 'color',
  SIZE = 'size',
}

registerEnumType(Types, {
  name: 'Types',
  description: 'Attribute types',
});
