import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaClient,
  ) {}

  async signIn(dto: LoginUserDto) {
    const user = await this.validateUser(dto.username, dto.password);
    return {
      accessToken: await this.issueTokenPair(user),
    };
  }

  async register(dto: RegisterUserDto) {
    const oldUser = await this.prismaService.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (oldUser) throw new UnauthorizedException('Логин занят');

    const salt = await genSalt(10);
    const newUser = await this.prismaService.user.create({
      data: {
        username: dto.username,
        password: await hash(dto.password, salt),
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    return {
      accessToken: await this.issueTokenPair(newUser),
      user: this.returnUserFields(newUser),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username: username },
    });
    if (!user) throw new UnauthorizedException('Неверный пароль или логин');
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Неверный пароль или логин');
    return user;
  }

  async issueTokenPair(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      password: user.password,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async returnUserFields(user: User) {
    return {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
  }
}
