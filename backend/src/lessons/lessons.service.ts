import { Injectable } from '@nestjs/common';
import { LessonType, PrismaClient, User, UserRole } from '@prisma/client';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

function isNumber(str: string) {
  if (typeof str !== 'string') return false; // Check if the input is a string
  // eslint-disable-next-line
  // @ts-ignore
  return !isNaN(str) && !isNaN(parseFloat(str)); // Check if the string can be converted to a number
}

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

  async final(journalId: number) {
    const journal = await this.prismaService.journal.findFirst({
      where: {
        id: journalId,
      },
      include: {
        lessons: true,
        grades: {
          select: {
            student: {
              select: {
                id: true,
              },
            },
            value: true,
            lesson: {
              select: {
                type: true,
              },
            },
          },
        },
        group: {
          select: {
            students: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    for (const student of journal.group.students) {
      let avgRO: number = 0;
      let ROcount: number = 0;
      let exam: number = 0;
      for (const grade of journal.grades) {
        console.log(grade, student);
        if (grade.student.id == student.id) {
          if (!grade.lesson) continue;

          if (grade.lesson.type == LessonType.EXAM) {
            if (!isNumber(grade.value)) continue;
            exam = Number(grade.value);
          } else if (grade.lesson.type == LessonType.RO) {
            if (!isNumber(grade.value)) continue;
            avgRO += Number(grade.value);
            ROcount++;
          }
        }
      }
      avgRO = avgRO / ROcount;
      const final = avgRO * 0.6 + exam * 0.4;

      const finalLesson = await this.prismaService.lesson.findFirst({
        where: { type: LessonType.FINAL, journalId: journalId },
      });

      await this.prismaService.grade.create({
        data: {
          journalId: journalId,
          studentId: student.id,
          lessonId: finalLesson.id,
          value: final.toString(),
        },
      });
    }
  }

  async update(user: User, dto: UpdateLessonDto, id: number) {
    // eslint-disable-next-line
    const lesson = await this.prismaService.lesson.update({
      where: {
        id: id,
        journal: {
          teacherId: user.role == UserRole.TEACHER ? user.id : undefined,
        },
      },
      data: dto,
    });

    if (dto.type == LessonType.FINAL) {
      await this.final(lesson.journalId);
    }

    return lesson;
  }

  async delete(id: number) {
    return await this.prismaService.lesson.delete({
      where: {
        id: id,
      },
    });
  }
}
