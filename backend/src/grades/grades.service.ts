import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateGradeDto } from './dto/create-grade.dto';

@Injectable()
export class GradesService {
  constructor(private prismaService: PrismaClient) {}

  async createOrUpdate(dto: CreateGradeDto) {
    const oldGrade = await this.prismaService.grade.findFirst({
      where: {
        lessonId: dto.lessonId,
        studentId: dto.studentId,
      },
    });
    if (oldGrade) {
      return this.prismaService.grade.update({
        where: {
          id: oldGrade.id,
        },
        data: {
          value: dto.value,
        },
      });
    }

    return this.prismaService.grade.create({
      data: {
        journalId: dto.journalId,
        studentId: dto.studentId,
        lessonId: dto.lessonId,
        value: dto.value,
      },
    });
  }
}
