import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaClient, User, UserRole } from '@prisma/client';
import { CreateJournalDto } from './dto/create-journal.dto';

@Injectable()
export class JournalsService {
  constructor(private prismaService: PrismaClient) {}

  async findOne(user: User, id: number) {
    try {
      return await this.prismaService.journal.findUniqueOrThrow({
        where: {
          id: id,
          teacherId: user.role == UserRole.TEACHER ? user.id : undefined,
        },
        select: {
          id: true,
          name: true,
          lessons: {
            select: {
              id: true,
              grades: {
                select: {
                  id: true,
                  value: true,
                  journalId: true,
                  lessonId: true,
                  studentId: true,
                },
                orderBy: {
                  id: 'asc',
                },
              },
              name: true,
            },
          },
          group: {
            select: {
              students: {
                where: {
                  id: user.role == UserRole.STUDENT ? user.id : undefined,
                },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
                take: user.role == UserRole.STUDENT ? 1 : undefined,
              },
            },
          },
        },
      });
    } catch (e) {
      throw new NotFoundException('Журнал не найден');
    }
  }

  async findAll(user: User) {
    let where: Prisma.JournalWhereInput;
    switch (user.role) {
      case UserRole.ADMIN:
        where = undefined;
        break;
      case UserRole.TEACHER:
        where = { teacherId: user.id };
        break;
      case UserRole.STUDENT:
        where = {
          groupId: user.groupId,
        };
        break;
    }

    return await this.prismaService.journal.findMany({
      where: where,
      select: {
        id: true,
        name: true,
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async create(dto: CreateJournalDto) {
    return await this.prismaService.journal.create({
      data: dto,
      select: {
        id: true,
        name: true,
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
