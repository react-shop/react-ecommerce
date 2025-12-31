import { Module } from '@nestjs/common';
import { UserResolver } from '@user/user.resolver';
import { UserService } from '@user/user.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
