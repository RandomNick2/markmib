import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { Mark } from '@prisma/client';

@Injectable()
export class MarksService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMarkDto) {
    return this.prisma.mark.create({
      data: {
        userId: data.user_id,
        score: data.score,
        createdAt: new Date(data.date),
      },
    });
  }

  async update(data: UpdateMarkDto) {
    const mark: Mark = await this.prisma.mark.findFirst({
      where: {
        id: data.mark_id,
      },
    });

    if (!mark) {
      throw new NotFoundException();
    }

    return this.prisma.mark.update({
      where: { id: data.mark_id },
      data: { score: data.score },
    });
  }

  async delete(id: number) {
    try {
      await this.prisma.mark.delete({
        where: { id: id },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAverageMark(userId: number) {
    const result = await this.prisma.mark.aggregate({
      where: {
        userId: userId,
      },
      _avg: {
        score: true,
      },
    });

    return result._avg.score;
  }
}
