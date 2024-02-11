import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { PrismaService } from '../prisma.service';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitService {
  constructor(private prisma: PrismaService) {}

  async create(createVisitDto: CreateVisitDto) {
    return this.prisma.visit.create({
      data: {
        userId: createVisitDto.user_id,
        visited: createVisitDto.visited,
      },
    });
  }

  async update(visitId: number, updateVisitDto: UpdateVisitDto) {
    return this.prisma.visit.update({
      where: { id: visitId },
      data: { visited: updateVisitDto.visited },
    });
  }

  async getAttendancePercentage(userId: number) {
    const totalVisits: number = await this.prisma.visit.count({
      where: { userId: userId },
    });

    const totalVisited: number = await this.prisma.visit.count({
      where: { userId: userId, visited: true },
    });

    return (totalVisited / totalVisits) * 100;
  }
}
