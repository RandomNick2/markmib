import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
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
    return this.lessonsService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.TEACHER)
  @UsePipes(new ValidationPipe())
  async update(
    @UserReq() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(user, dto, +id);
  }
}
