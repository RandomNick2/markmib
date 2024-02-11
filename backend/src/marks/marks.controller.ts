import {
  Body,
  Controller,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { MarksService } from './marks.service';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Post()
  @Roles(UserRole.TEACHER)
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateMarkDto) {
    return await this.marksService.create(body);
  }

  @Patch()
  @Roles(UserRole.TEACHER)
  @UsePipes(new ValidationPipe())
  async update(@Body() body: UpdateMarkDto) {
    return await this.marksService.update(body);
  }

  @Delete(':id')
  @Roles(UserRole.TEACHER)
  async delete(@Param('id') id: string) {
    await this.marksService.delete(+id);
  }
}
