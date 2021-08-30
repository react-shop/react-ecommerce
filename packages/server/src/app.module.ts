import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { ProductModule } from '@product/product.module';
import { StoreModule } from '@store/store.module';
import { AttributeModule } from '@attribute/attribute.module';
import { CategoryModule } from '@category/category.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schemas/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      // eslint-disable-next-line prettier/prettier
      port: process.env.DATABASE_PORT as unknown as number,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
    AttributeModule,
    StoreModule,
    CategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
