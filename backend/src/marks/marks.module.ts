import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MarksController],
  providers: [MarksService, PrismaService],
})
export class MarksModule {}
