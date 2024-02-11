import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async register(data: CreateUserDto) {
    const hashedPassword: string = await this.hashPassord(data.password);
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
        groupId: data.group_id,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }

  async hashPassord(password: string) {
    return await hash(password, await genSalt(10));
  }
}
