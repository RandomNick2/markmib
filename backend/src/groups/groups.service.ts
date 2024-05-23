import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(private prismaService: PrismaClient) {}

  async findAll() {
    return this.prismaService.group.findMany({
      include: {
        students: true,
        speciality: true,
        qualification: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    try {
      return this.prismaService.group.findUniqueOrThrow({
        where: { id: id },
        include: {
          students: true,
          speciality: true,
          qualification: true,
        },
      });
    } catch (e) {
      throw new NotFoundException('Группа не найдена');
    }
  }

  async create(dto: CreateGroupDto) {
    return this.prismaService.group.create({
      data: dto,
      include: {
        speciality: true,
        qualification: true,
      },
    });
  }

  async findSpeciality() {
    return this.prismaService.speciality.findMany();
  }

  async findQualification() {
    return this.prismaService.qualification.findMany();
  }
}
