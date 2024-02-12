import {
  Controller,
  Get,
  UseGuards,
  Request,
  UsePipes,
  Post,
  ValidationPipe,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req) {
    return await this.authService.me(req.user.username);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Public()
  async signIn(@Body() body: AuthLoginDto) {
    return await this.authService.login(body.username, body.password);
  }
}
