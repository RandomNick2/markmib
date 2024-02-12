import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string) {
    const user: User = await this.userService.findByUsername(username);

    if (!user) throw new UnauthorizedException();
    const isPasswordMatching: boolean = await compare(password, user.password);
    if (!isPasswordMatching) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: await this.configService.get('JWT_AUTH_SECRET'),
      }),
    };
  }

  async me(username: string): Promise<any> {
    try {
      const { password, ...user } =
        await this.userService.findByUsername(username);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
