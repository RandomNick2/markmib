import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddUserGroupDto } from './dto/add-user-group.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({
      data: createGroupDto,
    });
  }

  async remove(id: number) {
    try {
      await this.prisma.group.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async addUserGroup(addUserGroup: AddUserGroupDto) {
    await this.prisma.user.update({
      where: {
        id: addUserGroup.group_id,
      },

      data: {
        groupId: addUserGroup.group_id,
      },
    });
  }

  async getGroups() {
    return this.prisma.group.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
  
  async findOne(groupId: number) {
    return this.prisma.group.findFirst({
      where: { id: groupId },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
          },
          orderBy: {
            firstName: 'asc',
          },
        }
      }
    })
  }

  async findOneWithVisits(groupId: number) {
    try {
      return this.prisma.group.findFirst({
        where: { id: groupId },
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
            orderBy: {
              firstName: 'asc',
            },
            include: {
              visits: true
            }
          },
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
  
  async findOneWithMarks(groupId: number) {
    try {
      return this.prisma.group.findFirst({
        where: { id: groupId },
        include: {
          users: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
            orderBy: {
              firstName: 'asc',
            },
            include: {
              marks: true
            }
          },
        },
      });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
