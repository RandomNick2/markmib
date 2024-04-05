import { Injectable } from '@nestjs/common';
import { PrismaClient, User, UserRole } from '@prisma/client';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prismaService: PrismaClient) {}

  async create(dto: CreateLessonDto) {
    return await this.prismaService.lesson.create({
      data: {
        type: dto.type,
        journalId: dto.journalId,
        name: dto.name,
      },
      include: {
        grades: true,
      },
    });
  }

  async update(user: User, dto: UpdateLessonDto, id: number) {
    // eslint-disable-next-line
    return await this.prismaService.lesson.update({
      where: {
        id: id,
        journal: {
          teacherId: user.role == UserRole.TEACHER ? user.id : undefined,
        },
      },
      data: dto,
    });
  }

  async delete(id: number) {
    return await this.prismaService.lesson.delete({
      where: {
        id: id,
      },
    });
  }
}
