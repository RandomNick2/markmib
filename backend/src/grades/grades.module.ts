import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';

@Module({
  controllers: [GradesController],
  providers: [GradesService, PrismaClient],
})
export class GradesModule {}
