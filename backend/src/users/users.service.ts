import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient, UserRole } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaClient) {}

  async findAll(role?: UserRole) {
    const where = { role: role };
    return this.prismaService.user.findMany({
      where: role ? where : undefined,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async create(dto: CreateUserDto) {
    const oldUser = await this.prismaService.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    if (oldUser) throw new UnauthorizedException('Логин занят');
    const salt = await genSalt(10);

    dto.password = await hash(dto.password, salt);

    return this.prismaService.user.create({
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prismaService.user.delete({
      where: { id: id },
    });
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const salt = await genSalt(10);
    const newPassword = await hash(dto.newPassword, salt);
    await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
  }
}
