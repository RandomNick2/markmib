import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll(@Query('role') role?: UserRole) {
    return await this.usersService.findAll(role);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(+id, dto);
  }
}
