import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('speciality')
  async findSpeciality() {
    return this.groupsService.findSpeciality();
  }

  @Get('qualification')
  async findQualification() {
    return this.groupsService.findQualification();
  }

  @Get()
  @Roles(UserRole.ADMIN)
  async findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateGroupDto) {
    return this.groupsService.create(dto);
  }
}
