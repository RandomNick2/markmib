import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';

@Module({
  controllers: [JournalsController],
  providers: [JournalsService, PrismaClient],
})
export class JournalsModule {}
