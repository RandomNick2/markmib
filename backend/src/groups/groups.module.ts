import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, PrismaClient],
})
export class GroupsModule {}
