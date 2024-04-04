import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles';
import { UserReq } from 'src/auth/decorators/user';
import { CreateJournalDto } from './dto/create-journal.dto';
import { JournalsService } from './journals.service';

@Controller('journals')
export class JournalsController {
  constructor(private readonly journalsService: JournalsService) {}

  @Get()
  async findAll(@UserReq() user: User) {
    return this.journalsService.findAll(user);
  }

  @Get(':id')
  async findOne(@UserReq() user: User, @Param('id') id: string) {
    return this.journalsService.findOne(user, +id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(UserRole.ADMIN)
  async create(@Body() dto: CreateJournalDto) {
    return this.journalsService.create(dto);
  }
}
