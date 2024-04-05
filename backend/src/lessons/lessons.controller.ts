import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles';
import { UserReq } from 'src/auth/decorators/user';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @Roles(UserRole.TEACHER)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateLessonDto) {
    return await this.lessonsService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.TEACHER)
  @UsePipes(new ValidationPipe())
  async update(
    @UserReq() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return await this.lessonsService.update(user, dto, +id);
  }

  @Delete(':id')
  @Roles(UserRole.TEACHER)
  async delete(@Param('id') id: string) {
    return await this.lessonsService.delete(+id);
  }
}
