import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [GroupController],
  providers: [UserService, GroupService, PrismaService],
})
export class GroupModule {}
