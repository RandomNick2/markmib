import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, PrismaClient],
})
export class LessonsModule {}
