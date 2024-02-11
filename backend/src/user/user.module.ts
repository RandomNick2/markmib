import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { GroupService } from '../group/group.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PassportModule],
  controllers: [UserController],
  providers: [UserService, GroupService, PrismaService],
})
export class UserModule {}
