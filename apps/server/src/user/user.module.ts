import { Module } from '@nestjs/common';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
