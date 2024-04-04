import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles';
import { CreateGradeDto } from './dto/create-grade.dto';
import { GradesService } from './grades.service';

@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.TEACHER)
  async create(@Body() dto: CreateGradeDto) {
    return this.gradesService.createOrUpdate(dto);
  }
}
